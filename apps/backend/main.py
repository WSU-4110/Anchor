from fastapi import FastAPI
import uvicorn as uv


app = FastAPI()

@app.get("/")
def get_root():
    return{"message": "up and running"}


if __name__ == "_main_":
    uv.run(app, host="0.0.0.0", port=8000)

