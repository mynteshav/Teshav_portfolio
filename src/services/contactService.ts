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

// Live production backend URL on Render
const DEFAULT_PROD_API_URL = 'https://teshav-portfolio.onrender.com';

/**
 * Modular contact form submission service.
 * Ready for both local development and live cloud production on Render.
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  // Resolve API Base URL:
  // 1. Explicit VITE_API_URL or VITE_API_BASE_URL (from environment or .env.production)
  // 2. In local dev mode (import.meta.env.DEV): http://localhost:8000
  // 3. In production builds: defaults to the live Render backend
  const rawUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? 'http://localhost:8000' : DEFAULT_PROD_API_URL);

  const apiBaseUrl = (rawUrl || DEFAULT_PROD_API_URL).trim().replace(/\/+$/, '');

  const controller = new AbortController();
  // Allow 60s for Render free tier spin-up from cold sleep
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(`${apiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);

    const isAbort = err instanceof DOMException && err.name === 'AbortError';
    const errMessage = err instanceof Error ? err.message : 'Network error';
    const isLocal = apiBaseUrl.includes('localhost') || apiBaseUrl.includes('127.0.0.1');

    let explanation = `Could not connect to FastAPI server (${apiBaseUrl}): ${errMessage}.`;

    if (isAbort) {
      explanation = `The request timed out connecting to ${apiBaseUrl}. The server is waking up from free-tier sleep mode; please try again in a few moments.`;
    } else if (isLocal) {
      explanation += ' Please ensure the local FastAPI backend is running (run: python run.py inside portfolio-backend).';
    } else {
      explanation += ' The server may be waking up from sleep mode (Render free tier spin-up can take ~45s). Please try again in a few moments or email directly.';
    }

    return {
      success: false,
      message: explanation,
      source: 'fastapi'
    };
  }
}
