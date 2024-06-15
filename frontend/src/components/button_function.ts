import axios from 'axios';

export async function downloadFunction(url: string, setLoading: (loading: boolean) => void) {
    console.log('function called');
        setLoading(true);
        console.log("loading")
        // Send a request to the /create endpoint
        const createResponse = await axios.post('http://127.0.0.1:8000/create', { url: url });
        if (createResponse.status === 200) {
            // Poll the /download endpoint until it returns a 200 status
            const pid = await createResponse.data.process_id
            console.log(pid)
            let downloadResponse;
            do {
                downloadResponse = await axios.get('http://127.0.0.1:8000/download/'+pid, { responseType: 'blob' });
            } while (downloadResponse.status !== 200);

            // At this point, downloadResponse.data should contain the PDF data
            // You can handle the PDF data as needed, for example by creating a Blob and a download link
            const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        }
        setLoading(false);
        return "done";
    };
