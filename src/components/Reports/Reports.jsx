import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import postService from "../../services/postService";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import './Reports.css';

const Reports = (props) => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [blockDurations, setBlockDurations] = useState({});
  const [modalData, setModalData] = useState(null); // Tracks modal action data

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

  const isAdminOrModerator = props.userUser?.admin || channel.moderators?.includes(props.userUser?.id);

  if (!isAdminOrModerator) {
    return <div>404</div>;
  }

  const showModal = (action, postId, userId) => {
    setModalData({ action, postId, userId });
  };

  const handleConfirmAction = async () => {
    if (!modalData) return;

    const { action, postId, userId } = modalData;

    try {
      switch (action) {
        case "deletePost":
          await postService.delete(postId, path);
          setReportedPosts(reportedPosts.filter((post) => post._id !== postId));
          break;

        case "deleteReport":
          await postService.deleteReport(postId);
          setReportedPosts(
            reportedPosts
              .map((post) =>
                post._id === postId
                  ? { ...post, report: post.report.slice(1) }
                  : post
              )
              .filter((post) => post.report.length > 0)
          );
          break;

        case "deleteAllReports":
          await postService.deleteAllReports(postId);
          setReportedPosts(reportedPosts.filter((post) => post._id !== postId));
          break;

        case "blockUser":
          const duration = blockDurations[userId];
          if (!duration) return alert("Please select a block duration.");
          await postService.blockUser(userId, duration);

          const userPosts = reportedPosts.filter((post) => post.user._id === userId);
          for (const post of userPosts) {
            await postService.delete(post._id, path);
          }
          setReportedPosts(reportedPosts.filter((post) => post.user._id !== userId));

          alert(`User blocked for ${duration} and their posts deleted.`);
          break;

        default:
          console.error("Unknown action:", action);
      }
    } catch (err) {
      console.error(`Error performing action (${action}):`, err);
      alert(`Failed to ${action.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
    } finally {
      setModalData(null); // Close modal
    }
  };

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
                      <select
                        onChange={(e) =>
                          setBlockDurations({
                            ...blockDurations,
                            [post.user._id]: e.target.value,
                          })
                        }
                        defaultValue=""
                      >
                        <option value="" disabled>Select Duration</option>
                        <option value="1m">Block for 1 minute</option>
                        <option value="24h">Block for 24 hours</option>
                        <option value="30d">Block for 30 days</option>
                        <option value="10y">Block for 10 years</option>
                      </select>

                      <button onClick={() => showModal("blockUser", null, post.user._id)}>
                        Block
                      </button>

                      <button onClick={() => showModal("deletePost", post._id)}>
                        Delete Post
                      </button>
                      <button onClick={() => showModal("deleteReport", post._id)}>
                        Delete Report
                      </button>
                      <button onClick={() => showModal("deleteAllReports", post._id)}>
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

      {/* Modal */}
      {modalData && (
        <div className="Report-modal-overlay">
          <div className="Report-modal">
            <p>Are you sure you want to {modalData.action.replace(/([A-Z])/g, ' $1').toLowerCase()}?</p>
            <div className="Report-modal-buttons">
              <button className="Report-confirm-btn" onClick={handleConfirmAction}>
                Confirm
              </button>
              <button className="Report-cancel-btn" onClick={() => setModalData(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
