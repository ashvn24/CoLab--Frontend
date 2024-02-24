import { Modal } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";

function VideoLayout({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);
  console.log(selectedVideo);
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
        {videos.map((video, index) => (
          <div key={index} className="grid gap-1">
            <button
              onClick={() => {
                setSelectedVideo(video);
                setOpen(true);
              }}
              className="aspect-video overflow-hidden rounded-lg hover:border"
            >
              <img
                alt="Video thumbnail"
                className="aspect-video object-cover"
                src="https://www.iconninja.com/files/210/726/399/player-video-media-play-web-youtube-icon.svg"
                height="225"
                width="400"
              />
            </button>
          </div>
        ))}
      </div>

      <Modal
        title="Media player"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <ReactPlayer
          url={`http://127.0.0.1:8000${selectedVideo && selectedVideo.files}`}
          width="100%"
          height="100%"
          controls
          playing
        />
      </Modal>
    </main>
  );
}

export default VideoLayout;
