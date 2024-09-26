import { Link } from 'react-router-dom';
import './FileList.css';

const FileList = (props) => {
  if (!props.files || props.files.length === 0) return <main>No files yet</main>;

  return (
    <>
      {props.files.map((file, idx) => {
        const fileDate = new Date(file.createdAt);
        return (
          <div key={idx} className="card2">
            <div className="topCard2">
              <h1 className="fileTitle2">{file.title}</h1>
              <a className="fileLink2" href={file.link}>{file.link}</a>
              <p className="fileDescription2">{file.description}</p>
              <p className="fileUsername2">{file.user.username}</p>
              <p className="fileDate2">
                {fileDate.toLocaleDateString()} {fileDate.toLocaleTimeString()}{" "}
              </p>
            </div>

            
            <div className="dawnCard2">
              <button
                className="deleteButton2"
                onClick={() => {
                  props.handleDeleteFile(file._id, props.path);
                }}
              >
                Delete
              </button>
              <Link to={`${props.path}/newfile`}>
                <button className="deleteButton22">Edit File</button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FileList;
