import requests
from clerk_backend_api import Clerk
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwk, jwt

from enviornment import clerk_audience, clerk_jwks_url, clerk_secret_key

security = HTTPBearer()


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

"""
get_jwks

@params:

@return:
    json response
"""


def get_jwks():
    response = requests.get(clerk_jwks_url)
    return response.json()


"""
get_public_key

@params:

@return:
     public key
"""


def get_public_key(kid):
    jwks = get_jwks()
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwk.construct(key)
    raise HTTPException(status_code=401, detail="Invalid token")


"""
decode_token

@params:
    token : str

@returns:
    decoded token

"""


def decode_token(token: str):
    headers = jwt.get_unverified_headers(token)
    kid = headers["kid"]
    public_key = get_public_key(kid)
    return jwt.decode(
        token,
        public_key.to_pem().decode("utf-8"),
        algorithms=["RS256"],
        audience=clerk_audience,
    )


@router.get("/currentUser")
async def protected_route(
    request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
    clerk_sdk = Clerk(bearer_auth=clerk_secret_key)
    user_details = clerk_sdk.users.get(user_id=user_id)
    return {
        "status": "success",
        "data": {
            "email": user_details.email_addresses[0].email_address,
            "session_created_at": user_details.created_at,
            "session_last_active_at": user_details.last_active_at,
        },
    }
