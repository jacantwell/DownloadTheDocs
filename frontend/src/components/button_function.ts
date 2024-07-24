import axios from 'axios';

export async function downloadFunction(url: string, downloadUrlList:string[],  setDownloadUrlList: (downloadUrlList: string[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    console.log('function called');
    setLoading(true);
    console.log("loading")
    let return_url: string | undefined;

    
    // Send a request to the /create endpoint
    const createResponse = await axios.post('http://127.0.0.1:8000/create', { url: url });
    if (createResponse.status === 200) {
        // Poll the /download endpoint until it returns a 200 status
        const pid = await createResponse.data.process_id
        console.log(pid)
        let downloadResponse;
        do {
            // convert / in url to _
            url = url.replace(/\//g, '_');
            downloadResponse = await axios.get('http://127.0.0.1:8000/download/'+pid, { responseType: 'blob' });
        } while (downloadResponse.status !== 200);

        // At this point, downloadResponse.data should contain the PDF data
        // You can handle the PDF data as needed, for example by creating a Blob and a download link
        const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
        return_url = URL.createObjectURL(blob);
        console.log(downloadUrlList)
        downloadUrlList.push(return_url);
        console.log(downloadUrlList)
    }
    setLoading(false);
    setDownloadUrlList(downloadUrlList);
};
