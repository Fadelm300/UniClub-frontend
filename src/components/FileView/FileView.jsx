import './FileView.css';
const FileView = ({file}) => {
    return (
    <>
        {file && (
            file.type?.includes("image/") ? (
                <img
                    src={file.link}
                    alt="file"
                    className="file-image"
                />
            ) : file.type?.includes("video/") ? (
                <video
                    src={file.link}
                    controls
                    className="file-video"
                />
            ) : file.type?.includes("pdf") ? 
                (
                    <iframe
                        src={file.link}
                        title={file.title}
                        className="file-pdf"
                    ></iframe>
                ) : (
                <a href={file.link} target="_blank" rel="noopener noreferrer" className="file-link">
                    Open File
                </a>
            )
        )}
    </>
    );
};

export default FileView;