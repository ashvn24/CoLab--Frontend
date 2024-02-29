import React, { useState } from "react";
import ReactPlayer from "react-player";
import { BASEURL } from "../../Axios/Api/EndPoint";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


function VideoLayout({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  // const [open, setOpen] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();


  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
        {videos.map((video, index) => (
          <div key={index} className="grid gap-1">
            <button
              onClick={() => {
                setSelectedVideo(video);
              }}
              className="aspect-video overflow-hidden rounded-lg hover:border"
            >
              <img
              onClick={onOpen}
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
        backdrop={"blur"}
        className="bg-dark-4"
        size={"4xl"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Form</ModalHeader>
              <ModalBody>

              <ReactPlayer
              url={`${BASEURL}${selectedVideo && selectedVideo.files}`}
              width="100%"
              height="100%"
              controls
              playing
            />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* <Modal
        title="Media player"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        
      </Modal> */}
    </main>
  );
}

export default VideoLayout;
