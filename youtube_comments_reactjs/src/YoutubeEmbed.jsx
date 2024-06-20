import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const YoutubeEmbed = ({ videoLink }) => {
  const [comments, setComments] = useState([]); // Placeholder state for comments (optional)
  const videoId = new URL(videoLink).searchParams.get('v');
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  const handleViewComments = async () => {
    // Simulate comment retrieval (replace with actual implementation)
    const fetchedComments = [
      { id: 1, Comment: 'This is a comment!' },
      { id: 2, Comment: 'Another comment!' },
    ];
    setComments(fetchedComments);
    navigate(`/comments/${videoId}`, { state: { comments: fetchedComments } });
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          style={{ height: '200px', width: '400px' }}
        />
        <div className="video-info">
          <a href={`/comments/${videoId}`} className="comments" onClick={handleViewComments}>
            View Comments
          </a>
        </div>
      </div>
      <hr className="video-divider" />
    </div>
  );
};

export default YoutubeEmbed;
