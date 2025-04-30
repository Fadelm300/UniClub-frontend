import { Link } from 'react-router-dom';
import './PostList.css';
import postService from '../../services/postService';
import { useState , useEffect } from 'react';
import { filter } from 'framer-motion/client';

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>No posts yet...</main>;

  const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [Posts, setPosts] = useState([]);

  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000";
  const MAX_TEXT_LENGTH = 200;

  const [LikedPosts, setLikedPosts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false); 
  const [reportingPost, setReportingPost] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [filter, setFilter] = useState({
    sortBy: 'n',
    course: 'all',
    query:'', 
  });
  const [tempQuery, setTempQuery] = useState('');

  const courses = []
  for(let i = new Date().getFullYear(); i >= 2024; i--){
    courses.push(`${i}/${i+1}_First`);
    courses.push(`${i}/${i+1}_Second`);
    courses.push(`${i}/${i+1}_Summer`);
  }

  useEffect(() => {
    async function fetchPosts() {
      console.log(filter)
      const fetchedPosts = await postService.getPosts(props.channelId , filter);
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, [filter]); // <-- Correct place for dependency array
  

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setFilter({...filter,  [name]: value});
    
  }

  const toggleLike = async (postId) => {
    try {
      if (LikedPosts.includes(postId)) {
        setLikedPosts(LikedPosts.filter(id => id !== postId));
      } else {
        setLikedPosts([...LikedPosts, postId]);
      }
      postService.toggleLike(postId);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const handleShare = (postId) => {
    const postLink = `${window.location.origin}${props.path}/post/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setShowPopUp(true);  
        setTimeout(() => {
          setShowPopUp(false);  
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy the link:', error);
      });
  };


  const reportReasons = [
    "Inappropriate Content",
    "Harassment",
    "Fake News",
    "Offensive Language",
  ];
  
  const toggleReport = (postId) => {
    setReportingPost(reportingPost === postId ? null : postId);
    setReportReason("");
  };

  const submitReport = async (postId) => {
      if (!reportReason) return alert("Please select a reason.");
  
    try {
      const response = await postService.reportPost(postId, reportReason);
      alert("Report submitted successfully");
      setReportingPost(null); 
      setReportReason(""); 
    } catch (error) {
      console.error("Error reporting post:", error.message);
      alert(`Failed to submit report: ${error.message || "Unknown error"}`);
    }
  };
  
  
  return (
    <>
      {showPopUp && (
        <div className="popup-message">
          Link copied to clipboard!
        </div>
      )}

      <div className="cardContaner">




        
          <label htmlFor="sort-dropdown">Sort By: </label>
          <select
            id="sort-dropdown"
            name='sortBy'
            onChange={handleSortChange}
          >
            <option value="n">Newest</option>
            <option value="m">Most Liked</option>
          </select>
          <label htmlFor="course-dropdown">Course: </label>
          <select
            id="course-dropdown"
            name='course'
            onChange={handleSortChange}
          >
            <option value="all">All</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>{course}</option>
            ))}
          </select>
          <div className="search-container">
          <button
            className="search-icon-button"
            onClick={() => {
              setFilter({ ...filter, query: tempQuery });
            }
            }
          >
            <i className="fa fa-search search-icon"></i>
          </button>
          <input
          name="query"
          type="text"
          className="search-bar"
          placeholder="Search by username, text, comment..."
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)}
        />

        

        </div>
        {Posts?.map((post, idx) => {
          const postDate = new Date(post.createdAt);
          const isLongText = post.text.length > MAX_TEXT_LENGTH;
          const truncatedText = isLongText ? post.text.slice(0, MAX_TEXT_LENGTH) + '...' : post.text;

          const isPostLiked = LikedPosts.includes(post._id);
          const hasUserLikedPost = post.likes.includes(props.user?.id);
          const isReporting = reportingPost === post._id;

          return (
            <div className="card" key={idx}>
              
              <div className="dawnCard">
                <Link to={post.user._id === props.user?.id ? `/profile/${post.user._id}` : `/userlist/${post.user._id}`}>
                  <div className="dawnCardpostimg">
                    <img src={post.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />
                    <div className="dawncardusername">{post.user.username}</div>
                  </div>
                </Link>
                <div className="dawnCardText">
                  <div className="dawncardDate">
                  <div className="date">
                    {postDate.toLocaleDateString(
                      navigator.language.startsWith('ar') ? 'ar-EG' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </div>
                  <div className="time">
                    {postDate.toLocaleTimeString(
                      navigator.language.startsWith('ar') ? 'ar-EG' : 'en-US',
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </div>
                  
                      <button onClick={() => toggleReport(post._id)}>
                    {isReporting ? (
                      <img src="/close.png" alt="Cancel Report" />
                    ) : (
                      <img src="/dots.png" alt="Report" />
                    )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="topCard">
                  {isReporting && (
                    <div className={`reportContainer ${isReporting ? "show" : ""}`}>
                      <h4>Report Post</h4>
                      {/* طريقة الاولى */}
                      {/* <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    {reportReasons.map((reason, idx) => (
                      <option key={idx} value={reason}>{reason}</option>
                    ))}
                  </select> */}

                  {/* الطريقة الثانية  */}
                  <div className="report-reasons">
                    {reportReasons.map((reason, idx) => (
                      <div key={idx} className="report-reason">
                        <input
                          type="radio"
                          id={`reason-${idx}`}
                          name="reportReason"
                          value={reason}
                          checked={reportReason === reason}
                          onChange={(e) => setReportReason(e.target.value)}
                        />
                        <label htmlFor={`reason-${idx}`}>{reason}</label>
                      </div>
                    ))}
                  </div>
                        <button onClick={() => submitReport(post._id)}>Submit Report</button>
                        <button onClick={() => toggleReport(post._id)}>Cancel</button>
                    </div>
                  )}

                {/* Post Content */}
                <Link to={`${props.path}/post/${post._id}`}>
                  <div className="topcardtex">
                    <div className="topcardTextContent">
                      {truncatedText}
                      {isLongText && <span className="readMore"> Click to read more</span>}
                    </div>
                    <div className="topcardimage">
                      {/* <img src={post.image} alt="" /> */}
                      {post.file &&
                      post.file?.type?.includes('image') ? (
                        <img src={post.file.link} alt="Post"  style={{ filter: `blur(${0}px)` }}/>
                        
                      ) : 
                      post.file?.type?.includes('video') ? (
                        <video controls>
                          <source src={post.file.link} type="video/mp4" />
                        </video>
                      ) : <></>
                      }
                    </div>
                  </div>
                </Link>
              </div>

              {/* Social Interaction Section */}
              {props.user && (
                <div className="interactionBar">
                  <div className="interactionItem" onClick={() => handleShare(post._id)}>
                    <img src="/icons8-share-50.png" alt="Share" />
                    <span>Share</span>
                  </div>

                  <div className="interactionItem">
                    <img src="/icons8-save-48.png" alt="Save" />
                    <span>{post.saves || 0}</span>
                  </div>

                  <div className="interactionItem">
                    <img src="/icons8-results-24.png" alt="Views" />
                    <span>{post.views || 0}</span>
                  </div>

                  <div className="interactionItem">
                    <Link to={`${props.path}/post/${post._id}`}>
                      <img src="/icons8-comment-50.png" alt="Comments" />
                      <span>{post.comments.length || 0}</span>
                    </Link>
                  </div>

                  <div className="interactionItem" onClick={() => toggleLike(post._id)}>
                    <img
                      src={(!hasUserLikedPost && isPostLiked) || (hasUserLikedPost && !isPostLiked)
                        ? "/like.png"
                        : "/icons8-like-50.png"}
                      alt="Likes"
                    />
                    <span>
                      {isPostLiked
                        ? hasUserLikedPost
                          ? post.likes.length - 1
                          : post.likes.length + 1
                        : post.likes.length}
                    </span>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostList;
