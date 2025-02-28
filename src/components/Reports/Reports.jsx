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
        const data =await postService.getReportedPosts(path);
        setReportedPosts(data);
      } catch (err) {
        
      }
    };
    fetchReports();
  }, [path]);

  {!(props.userUser?.admin || channel.moderators?.includes(props.userUser?.id))&& (
                  <>
                    404
                  </>
  
                )}

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
