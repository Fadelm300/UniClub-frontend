import { Link } from 'react-router-dom';
import './FileList.css';

const FileList = (props) => {
  

  if (!props.files || props.files.length === 0) return <main>no files yet</main>;
  return (
    <>
      {props.files.map((file, idx) => {
        const fileDate = new Date(file.createdAt);
        return (
          <div key={idx} className="card">
            <div className="topCard">
              <h1>{file.title}</h1>
              <a href={file.link}>{file.link}</a>
              <h1>{file.description}</h1>

              <p>{file.user.username}</p>
              <p>
                {fileDate.toLocaleDateString()} {fileDate.toLocaleTimeString()}{" "}
              </p>
            </div>
            <div className="dawnCard">
              <button
                className="deleteButton"
                onClick={() => {
                  props.handleDeleteFile(file._id, props.path) 
                }}
              >
                Delete
              </button>
              {/* <Link to={`${props.path}/newfile`}>
                <button className="deleteButton">Edit File</button>
              </Link> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FileList;
