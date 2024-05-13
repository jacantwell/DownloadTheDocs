from playwright.async_api import async_playwright
from PyPDF2 import PdfMerger
import asyncio
import os

class Scraper():
    def __init__(self, url:str) -> None:
        self.url = url
        self.name = url.replace("https://", "").split("/")[0]

    async def get_links_and_generate_pdfs(self):
        # Use playwright to launch a browser and navigate to the URL
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(self.url)
            links = await page.eval_on_selector_all(
                "a[href]", '''elements => elements.map(element => 
                new URL(element.href, window.location.origin).href)'''
            )

            for _, link in enumerate(links):

                if self.url in link:
                    try:
                        await page.goto(link)
                        await page.pdf(path=f'{self.name}/seperated_pdfs/{link.replace(self.url, "", 1)}.pdf')
                    
                    except Exception as e:
                        print(f"Failed to generate PDF for {link}: {e}")

            await browser.close()

    def merge_pdfs(self):
        merger = PdfMerger()

        # Walk through the directory and its subdirectories
        for dirpath, _, filenames in os.walk(f'{self.name}/seperated_pdfs'):
            # For each file in the directory
            for filename in filenames:
                # If the file is a PDF
                if filename.endswith('.pdf'):
                    # Append the PDF to the merger
                    merger.append(os.path.join(dirpath, filename))

        # Write the merged PDF to the output file
        merger.write(self.name + "/" + f"{self.name}.pdf")
        merger.close()

scarpper = Scraper("https://twinlab.ai/python/reference")
asyncio.run(scarpper.get_links_and_generate_pdfs())
scarpper.merge_pdfs()