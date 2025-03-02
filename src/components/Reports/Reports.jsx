import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../services/postService";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

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
  

  return (
    <div>
      <h2>Reported Posts</h2>
      {reportedPosts.length === 0 ? (
        <p>No reported posts found.</p>
      ) : (
        <table>
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
                <td>{post.content}</td>
                <td>
                  {post.report.map((r) => (
                    <div key={r.user._id}>{r.user.username}</div>
                  ))}
                </td>
                <td>
                  {post.report.map((r) => (
                    <div key={r.user._id}>{r.reason}</div>
                  ))}
                </td>
                <td>
                  {isAdminOrModerator && (
                    <>
      <button onClick={() => handleDeletePostrx7(post._id)}>Delete Post</button>
      <button onClick={() => handleDeleteReport(post._id)}>Delete Report</button>
                      <button onClick={() => handleDeleteallReportOnThisPost(post._id)}>Delete All Reports</button>
                    </>
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
