import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import postService from "../../services/postService";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import './Reports.css';

const Reports = (props) => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await postService.getReportedPosts(path);
        setReportedPosts(data);
      } catch (err) {
        console.error("Error fetching reported posts:", err);
      }
    };
    fetchReports();
  }, [path]);

  // Check if the user is admin or moderator
  const isAdminOrModerator = props.userUser?.admin || channel.moderators?.includes(props.userUser?.id);

  if (!isAdminOrModerator) {
    return <div>404</div>;
  }

  const handleDeleteReport = async (postId) => {
    try {
      await postService.deleteReport(postId);
      
      setReportedPosts(
        reportedPosts
          .map((post) =>
            post._id === postId ? { ...post, report: post.report.slice(1) } : post
          )
          .filter((post) => post.report.length > 0) // Remove posts with no reports
      );
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  const handleDeleteallReportOnThisPost = async (postId) => {
    try {
      await postService.deleteAllReports(postId);
      
      setReportedPosts(reportedPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting all reports:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.delete(postId ,path);
      setReportedPosts(reportedPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  return (
    <div className="reports-container">
    <h2>Reported Posts</h2>
    {reportedPosts.length === 0 ? (
      <p className="empty-state-message">No reported posts found.</p>
    ) : (
      <table className="reports-table">
        <thead>
          <tr>
            <th>Post</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reportedPosts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link to={`${path}/post/${post._id}`} className="report-link">
                  {post.text}
                </Link>
              </td>
              <td>
                <div className="reported-users">
                <Link to={`/userlist/${post.user._id}`}>
                  {post.report.map((r) => (
                    <div key={r.user._id}>{r.user.username}</div>
                  ))}
                  </Link>
                </div>
              </td>
              <td>
                <div className="reported-users">
                  {post.report.map((r) => (
                    <div key={r.user._id}>{r.reason}</div>
                  ))}
                </div>
              </td>
              <td>
                {isAdminOrModerator && (
                  <div className="action-buttons">
                    <button onClick={() => handleDeletePost(post._id)}>
                      Delete Post
                    </button>
                    <button onClick={() => handleDeleteReport(post._id)}>
                      Delete Report
                    </button>
                    <button onClick={() => handleDeleteallReportOnThisPost(post._id)}>
                      Delete All Reports
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  
  );
};

export default Reports;
