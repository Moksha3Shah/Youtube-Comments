import React from 'react';
import { Link } from 'react-router-dom';

const YOUTUBE_THUMBNAIL_BASE_URL = 'https://img.youtube.com/vi/';

const videoData = [
  { url: 'https://www.youtube.com/watch?v=FsGdznlfE2U', id: 'FsGdznlfE2U' },
  { url: 'https://www.youtube.com/watch?v=gir8BEqAutk', id: 'gir8BEqAutk' },
  { url: 'https://www.youtube.com/watch?v=2JgvVfOfoWI', id: '2JgvVfOfoWI' },
  { url: 'https://www.youtube.com/watch?v=gp1MR2WAAXY', id: 'gp1MR2WAAXY' },
  { url: 'https://www.youtube.com/watch?v=_Usd5X5XJXM', id: '_Usd5X5XJXM' },
  { url: 'https://www.youtube.com/watch?v=mvVBuG4IOW4', id: 'mvVBuG4IOW4' },
  { url: 'https://www.youtube.com/watch?v=89aQIli8aVU', id: '89aQIli8aVU' },
  { url: 'https://www.youtube.com/watch?v=lUvBk4owRNU', id: 'lUvBk4owRNU' },
  { url: 'https://www.youtube.com/watch?v=vtW_4j7SsZk', id: 'vtW_4j7SsZk' },
  { url: 'https://www.youtube.com/watch?v=rnwD7veCoFQ', id: 'rnwD7veCoFQ' },
  { url: 'https://www.youtube.com/watch?v=mvxQYPR4lmU', id: 'mvxQYPR4lmU' },
  { url: 'https://www.youtube.com/watch?v=0jTGzm-6cYE', id: '0jTGzm-6cYE' },
  { url: 'https://www.youtube.com/watch?v=AppsjTInqiw', id: 'AppsjTInqiw' },
  { url: 'https://www.youtube.com/watch?v=JhICcmiIE80', id: 'JhICcmiIE80' },
  { url: 'https://www.youtube.com/watch?v=M7ySK0keirY', id: 'M7ySK0keirY' },
  { url: 'https://www.youtube.com/watch?v=3-BcH7KowGE', id: '3-BcH7KowGE' },
  { url: 'https://www.youtube.com/watch?v=qrxsceexTBw', id: 'qrxsceexTBw' },
  { url: 'https://www.youtube.com/watch?v=C-z-IckrQK8', id: 'C-z-IckrQK8' },
  { url: 'https://www.youtube.com/watch?v=yF4ulRTCn44', id: 'yF4ulRTCn44' },
  { url: 'https://www.youtube.com/watch?v=ZGBPKYbzSXs', id: 'ZGBPKYbzSXs' },
  { url: 'https://www.youtube.com/watch?v=tNxUxm3-658', id: 'tNxUxm3-658' },
];
const VideoGrid = () => {
  const rows = Math.ceil(videoData.length / 3); // Calculate the number of rows

  return (
    <div className="video-grid">
      {Array(rows)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="video-row">
            {videoData.slice(rowIndex * 3, (rowIndex + 1) * 3).map((video) => (
              <div key={video.id} className="video-item">
                <a href={video.url} target="_blank" rel="noreferrer">
                  <img
                    src={`${YOUTUBE_THUMBNAIL_BASE_URL}${video.id}/hqdefault.jpg`}
                    alt={`Thumbnail for ${video.url}`}
                  />
                </a>
                <Link to={`/comments/${video.id}`}>View Comments</Link>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default VideoGrid;