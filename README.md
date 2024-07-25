# DownloadTheDocs

This is a simple python scarper that can be used to tunr any webpage into a downloadable PDF.


# Deployment

## Local

To deploy the application locally just follow these steps.

1. Navigate to the api directory and install the dependencies. You have to explicitly install playwright.

```bash 
cd api
poetry install --no-root
poetry run playwright install
```

2. Deploy the scraper to your local port `8000` using `uvicorn`.

```bash
poetry run uvicorn api:app --port 8000 --reload
```

3. Now in a new terminal navigate to the frontend to deploy the web interface.

```bash
cd ../frontend
npm install
npm run start
```

