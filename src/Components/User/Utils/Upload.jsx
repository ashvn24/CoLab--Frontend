import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const UploadVideo = () => {
  const [fileURLs, setFileURLs] = useState([]);

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        // Convert the uploaded file into a URL and store it in state
        const url = URL.createObjectURL(info.file.originFileObj);
        setFileURLs(prevURLs => [...prevURLs, url]);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text text-white">Click or drag file to this area to upload</p>
      {fileURLs.map((url, index) => (
        <video key={index} controls style={{ maxWidth: '300px' }}>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </Dragger>
  );
};

export default UploadVideo;
