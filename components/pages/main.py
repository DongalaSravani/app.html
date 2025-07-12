from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

origins = ["http://localhost:3000"]  # Next.js dev server

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reflection(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_emotion(reflection: Reflection):
    fake_emotions = ["Happy", "Anxious", "Calm", "Excited", "Angry", "Sad"]
    selected = random.choice(fake_emotions)
    confidence = round(random.uniform(0.7, 0.99), 2)

    return {"emotion": selected, "confidence": confidence}
