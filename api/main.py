
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

# Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the Lambda handler
handler = Mangum(app)

# AWS Lambda handler for FAST API integration, identifying warm-up invocations and passing events to the main handler.
def lambda_handler(event, context):
    if "source" in event and event["source"] == "aws.events":
        print("This is a warm-up invocation.")
        return {}
    else:
        return handler(event, context)