import "../style/home.css";

interface PreviewBoxProps {
    title: string;
    pdfURLlist: string[];
    pdfNames: string[];
}

const PreviewBox: React.FC<PreviewBoxProps> = (props) => {
    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    }
    console.log(props)

    if (props.pdfURLlist.length === 0) {
        return (
            <div className="bottom-container">
                <div className='box'>
                    <p>No PDFs Requested</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bottom-container">
            {props.pdfURLlist.map((url, index) => (
                <div className='box' onClick={() => handleDownload(url)} key={index}>
                    <p>{props.pdfNames[index]}</p>
                </div>
            ))}
        </div>
    );
};

export default PreviewBox;