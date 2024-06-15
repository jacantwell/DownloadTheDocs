from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import FileResponse
from scraper import Scraper
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
import uuid

app = FastAPI()

# Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api", app)

class PDFRequest(BaseModel):
    url: str

@app.post("/create")
async def create_pdf(params: PDFRequest):
        
        id = uuid.uuid4()

        print(params.url)
        # Create a Scraper instance with the provided URL
        scraper = Scraper(id)

        # Run the methods asynchronously if they support it
        result = await scraper.get_links_and_generate_pdfs(params.url)
        
        # Assume merge_pdfs() is synchronous
        result = scraper.merge_pdfs(result["name"])

        return result

class DownloadRequest(BaseModel):
    id: str

@app.get("/download/{id}")
def download_pdf(id: str):
    try:

        # Create a Scraper instance with the provided URL
        scraper = Scraper(id)


        # Define the PDF file as a response
        return FileResponse(f"processes/{id}/merged.pdf", filename=f"merged.pdf", media_type='application/pdf')
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Scraper API!"}



# # Define the Lambda handler
# handler = Mangum(app)

# # AWS Lambda handler for FAST API integration, identifying warm-up invocations and passing events to the main handler.
# def lambda_handler(event, context):
#     if "source" in event and event["source"] == "aws.events":
#         print("This is a warm-up invocation.")
#         return {}
#     else:
#         return handler(event, context)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
