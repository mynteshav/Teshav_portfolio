export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Optional honeypot trap for bots
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  source: 'fastapi' | 'fallback';
}

/**
 * Modular contact form submission service.
 * Supports production and local environments via VITE_API_URL / VITE_API_BASE_URL.
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  // Resolve API Base URL: checks VITE_API_URL, then VITE_API_BASE_URL, defaulting to http://localhost:8000 in dev
  const rawUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? 'http://localhost:8000' : '');

  const apiBaseUrl = (rawUrl || '').trim().replace(/\/+$/, '');

  if (apiBaseUrl) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        let errorDetail = `Server returned status ${response.status}`;

        if (responseData) {
          if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
            errorDetail = responseData.errors
              .map((e: { field?: string; message?: string; msg?: string }) => {
                const fieldName = e.field ? `${e.field.replace('body -> ', '')}: ` : '';
                return `${fieldName}${e.message || e.msg || 'Invalid field'}`;
              })
              .join('; ');
          } else if (typeof responseData.detail === 'string') {
            errorDetail = responseData.detail;
          } else if (Array.isArray(responseData.detail)) {
            errorDetail = responseData.detail
              .map((d: { msg?: string; message?: string }) => d.msg || d.message || JSON.stringify(d))
              .join('; ');
          } else if (typeof responseData.message === 'string') {
            errorDetail = responseData.message;
          }
        }

        return {
          success: false,
          message: errorDetail,
          source: 'fastapi'
        };
      }

      return {
        success: true,
        message:
          responseData?.message ||
          'Your message has been dispatched successfully to Teshav Sharma.',
        source: 'fastapi'
      };
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Network error';
      const isLocal = apiBaseUrl.includes('localhost') || apiBaseUrl.includes('127.0.0.1');

      let explanation = `Could not connect to FastAPI server (${apiBaseUrl}): ${errMessage}.`;
      if (isLocal) {
        explanation += ' Please ensure the FastAPI backend is running (run: python run.py inside portfolio-backend).';
      } else {
        explanation += ' Please check your connection or send a direct email.';
      }

      return {
        success: false,
        message: explanation,
        source: 'fastapi'
      };
    }
  }

  // When no backend API URL is configured in production builds
  return {
    success: false,
    message:
      'Backend API endpoint is not configured (set VITE_API_URL). Please use the direct email button below.',
    source: 'fallback'
  };
}
