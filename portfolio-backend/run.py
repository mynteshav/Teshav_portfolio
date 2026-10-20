import uvicorn
import os
import sys

# Ensure portfolio-backend is on the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    from app.core.config import settings

    host = os.getenv("HOST", settings.HOST)
    port = int(os.getenv("PORT", settings.PORT))
    reload = settings.ENVIRONMENT.lower() == "development"

    print(f"Starting Teshav Sharma Portfolio Backend on http://{host}:{port}")
    print(f"Swagger Documentation available at http://{host}:{port}/docs")
    
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=reload
    )
