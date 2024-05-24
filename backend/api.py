from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from scraper import Scraper
import os

app = FastAPI()

@app.get("/{url}/download-pdf")
async def download_pdf(url: str):
    try:
        # Create a Scraper instance with the provided URL
        scraper = Scraper(url)

        # Run the methods asynchronously if they support it
        await scraper.get_links_and_generate_pdfs()
        
        # Assume merge_pdfs() is synchronous
        scraper.merge_pdfs()

        # Define the path to the generated PDF
        filepath = f"{scraper.name}/{scraper.name}.pdf"

        # Check if the file exists
        if not os.path.exists(filepath):
            raise HTTPException(status_code=404, detail="PDF not found")

        # Return the PDF file as a response
        return FileResponse(filepath, filename=f"{scraper.name}.pdf", media_type='application/pdf')
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
