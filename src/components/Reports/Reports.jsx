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

  const handleDeletePost = async (postId) => {
    try {
      const result = await postService.deleteReportedPost(postId);
      // Remove the deleted post from the state
      setReportedPosts(reportedPosts.filter(post => post._id !== postId));
      alert("Post deleted successfully");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  // Check if the user is admin or moderator
  const isAdminOrModerator = props.userUser?.admin || channel.moderators?.includes(props.userUser?.id);

  if (!isAdminOrModerator) {
    return <div>404</div>;
  }

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
                    <button onClick={() => handleDeletePost(post._id)}>Delete</button>
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
