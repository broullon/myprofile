import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import predictor2 as CandidateBot
import uvicorn

class InputQuestion(BaseModel):
    input: dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot = CandidateBot.CandidateBot()

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/chat")
def chat(input_question: InputQuestion):

    #Get user question
    user_input = input_question.input.get("question", "")
    if user_input.strip() == "" or not user_input:
        return {"answer": "Please provide a valid question."}
    
    #get answer
    answer = bot.process_question(user_input)
    return {"answer": answer}


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=PORT)