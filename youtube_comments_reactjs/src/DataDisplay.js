import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CosmosClient } from '@azure/cosmos';

const endpoint = 'https://yourendpoint/';
const key = '************************************************************************';
const databaseName = 'YouTubeDB';
const containerName = 'CommentsCollection';

const MAX_COMMENTS_LIMIT = 50; // Adjust the limit as needed

function DataDisplay() {
  const location = useLocation();
  const videoId = location.pathname.split('/').pop(); // Get video ID from URL
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0); // State for total comments

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const client = new CosmosClient({ endpoint, key });
        const container = client.database(databaseName).container(containerName);

        // Get total comments count
        const { resources: countItems } = await container.items
          .query(`SELECT COUNT(c.id) AS total FROM c WHERE c.VideoID = '${videoId}'`)
          .fetchAll();

        const totalComments = countItems[0]?.total || 0; // Handle potential absence of count

        // Get comments with limit
        const { resources: items } = await container.items
          .query(`SELECT TOP ${MAX_COMMENTS_LIMIT} * FROM c WHERE c.VideoID = '${videoId}' ORDER BY c.Timestamp DESC`)
          .fetchAll();

        setData(items);
        setTotalCount(totalComments);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  return (
    <div>
      {totalCount > 0 && (
        <div className='header-container2'>
        <h1 className="page-header">
          Total Comments: {totalCount} (Displayed: {data.length})
        </h1>
        </div>
      )}
      {isLoading && <p className='loading'>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <ul className="comments-grid">
          {data.map((comment) => (
            <li key={comment.id} className="comment-card">
              <div className="comment-info">
                <p>Username: {comment.Username}</p>
                <p>Video ID: {comment.VideoID}</p>
                <p>Like Count: {comment.LikeCount}</p>
              </div>
              <p className="comment-text">{comment.Comment}</p>
            </li>
          ))}
        </ul>
      )}
      {data.length === 0 && !isLoading && <p>No comments found.</p>}
    </div>
  );
}

export default DataDisplay;
