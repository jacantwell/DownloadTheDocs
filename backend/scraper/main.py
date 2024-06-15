from playwright.async_api import async_playwright
from PyPDF2 import PdfMerger
import os

class Scraper():
    def __init__(self, id: str) -> None:
        self.id = id

    async def get_links_and_generate_pdfs(self, url:str):
        
        name = url.replace("https://", "").split("/")[0]
        id_str = str(self.id)
        # if no directory exists, create one
        if not os.path.exists("processes/" + id_str):
            os.makedirs("processes/" + id_str)


        # Use playwright to launch a browser and navigate to the URL
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(url)
            links = await page.eval_on_selector_all(
                "a[href]", '''elements => elements.map(element => 
                new URL(element.href, window.location.origin).href)'''
            )

            for _, link in enumerate(links):

                if url in link:
                    try:
                        await page.goto(link)
                        await page.pdf(path=f'processes/{id_str}/{name}/seperated_pdfs/{link.replace(url, "", 1)}.pdf')
                    
                    except Exception as e:
                        print(f"Failed to generate PDF for {link}: {e}")

            await browser.close()

        return {"id": self.id,
                "name": name}

    def merge_pdfs(self, name:str):
        id_str = str(self.id)
        merger = PdfMerger()

        # Walk through the directory and its subdirectories
        for dirpath, _, filenames in os.walk(f'processes/{id_str}/{name}/seperated_pdfs'):
            # For each file in the directory
            for filename in filenames:
                # If the file is a PDF
                if filename.endswith('.pdf'):
                    # Append the PDF to the merger
                    merger.append(os.path.join(dirpath, filename))

        # if no directory exists, create one
        if not os.path.exists("processes/" + id_str):
            os.makedirs("processes/" + id_str)

        # Write the merged PDF to the output file
        filepath = "processes/" + id_str + "/merged.pdf"
        merger.write(filepath)
        merger.close()

        print(f"Successfully merged PDFs to {filepath}")
        return {"process_id": self.id}
