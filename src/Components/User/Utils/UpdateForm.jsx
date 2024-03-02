import { Flex } from "antd";
import React, { useCallback, useState } from "react";
import UploadVideo from "./Upload";
import { useSelector } from "react-redux";

const UpdateForm = ({ handleOk = () => {} }) => {
  const { post, status, error } = useSelector((state) => state.postDetails);
  const filesArray =
    post &&
    post.attachments &&
    post.attachments.map((vid) => {
      return vid.files;
    });
  const [updateData, setUpdateData] = useState({
    title: post.title || "",
    titleDesc: post.titleDesc || "",
    description: post.description || "",
    files: [...filesArray],
  });

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setUpdateData((prevData) => ({ ...prevData, files: files }));
  }, []);

  const handleDelete = (indexToRemove) => {
    setUpdateData((prevData) => ({
      ...prevData,
      files: prevData.files.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleForm = useCallback((e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return (
    <div className="w-full text-light-2">
      <form onSubmit={handleOk(updateData)}>
        <Flex vertical gap={13}>
          Title:
          <input className="shad-input rounded-lg"
            showCount
            maxLength={400}
            name="title"
            style={{ height: 50 }}
            value={updateData.title}
            onChange={handleForm}
          />
          Title Desc:
          <input className="shad-input rounded-lg"
            showCount
            maxLength={400}
            name="titleDesc"
            style={{ height: 50 }}
            value={updateData.titleDesc}
            onChange={handleForm}
          />
          Description:
          <textarea
            name="description"
            value={updateData.description}
            showCount
            maxLength={1000}
            onChange={handleForm}
            placeholder="write Description"
            style={{
              height: 120,
              resize: "none",
            }}
            className='shad-textarea'
          />
          Upload Media:
          <UploadVideo handleFileChange={handleFileChange} />
          {/* { progres.started && <Progress percent={progres.pc} />} */}
        </Flex>
        
        {/* { progres.started && <progress max="100" value={progres.pc }></progress> } */}
      </form>
    </div>
  );
};

export default UpdateForm;
