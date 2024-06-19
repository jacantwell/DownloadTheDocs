import "../style/home.css";

interface PreviewBoxProps {
    title: string;
    pdfURLlist: string[];
}

const PreviewBox: React.FC<PreviewBoxProps> = (props) => {
    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    }
    console.log(props)

    if (props.pdfURLlist.length === 0) {
        return (
            <div className='box'>
                <p>No PDFs available</p>
            </div>
        );
    }

    return (
        <div className="bottom-container">
            {props.pdfURLlist.map((url, index) => (
                <div className='box' onClick={() => handleDownload(url)} key={index}>
                    <p>Preview {index}</p>
                </div>
            ))}
        </div>
    );
};

export default PreviewBox;