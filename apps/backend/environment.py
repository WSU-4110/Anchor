import os

from dotenv import load_dotenv

load_dotenv()

"""
TODO: Loader function for env variables to ensure they are not null

"""
clerk_jwks_url = os.getenv("CLERK_JWKS_URL")
if not clerk_jwks_url:
    raise ValueError("CRITICAL: CLERK_JWKS_URL is not set in environment variables!")

clerk_secret_key = os.getenv("CLERK_SECRET_KEY")
clerk_audience = os.getenv("CLERK_AUDIENCE")
