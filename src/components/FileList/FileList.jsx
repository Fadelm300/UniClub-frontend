import { Link } from 'react-router-dom';
import './FileList.css';

const FileList = (props) => {
  if (!props.files || props.files.length === 0) return <main>No files yet</main>;

  return (
    <>
      <div className="FileContanir">
        <div className="cardsWrapper">
          {props.files.map((file, idx) => {
            const fileDate = new Date(file.createdAt);
            return (
              <div key={idx} className="card2">
                <Link to={`${props.path}/file/${file._id}`}>
                
                  <div className="topCard2">
             {/* //// */}
             <h1>111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</h1>
             <h1 className="fileTitle2">{file.title}</h1>

                  </div>
                </Link>
                <div className="dawnCard2">
                            <Link>
                              <button
                                className="iconButton"
                                onClick={() => {
                                  props.handleDeleteFile(file._id, props.path);
                                }}
                              >
                                <img 
                                  src="https://img.icons8.com/?size=40&id=T5dnyLNPujOw&format=png&color=000000" 
                                  alt="Delete file" 
                                  className="buttonIcon" 
                                />
                              </button></Link>

                              <Link to={`${props.path}/newfile`}>
                                <button className="iconButton">
                                  <img 
                                    src="https://img.icons8.com/?size=40&id=XPJ22YD4LrLc&format=png&color=000000" 
                                    alt="Edit file" 
                                    className="buttonIcon" 
                                  />
                                </button>
                              </Link>
                            </div>

              </div>
            );
          })}
        </div>

        <div className="radomFiles">
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
        </div>
      </div>
    </>
  );
};

export default FileList;
