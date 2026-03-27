import os
import predictor2 as CandidateBot
from pydantic import BaseModel

class InputQuestion(BaseModel):
    input: dict

def chat():
    bot = CandidateBot.CandidateBot()

    while True:
        user_input = input("Enter your question: ").strip()

        if not user_input:
            print("Please provide a valid question.")
            continue

        if user_input.lower() in {"exit", "quit"}:
            print("Exiting the chat.")
            break

        answer = bot.process_question(user_input)
        print(answer)

if __name__ == "__main__":
    chat()
