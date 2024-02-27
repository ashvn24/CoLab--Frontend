import { Flex, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useCallback, useState } from "react";
import UploadVideo from "./Upload";
import { useSelector } from "react-redux";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MovieIcon from "@mui/icons-material/Movie";

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
    <div className="w-full">
      <form onSubmit={handleOk(updateData)}>
        <Flex vertical gap={13}>
          Title:
          <Input
            showCount
            maxLength={400}
            name="title"
            style={{ height: 50 }}
            value={updateData.title}
            onChange={handleForm}
          />
          Title Desc:
          <Input
            showCount
            maxLength={400}
            name="titleDesc"
            style={{ height: 50 }}
            value={updateData.titleDesc}
            onChange={handleForm}
          />
          Description:
          <TextArea
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
          />
          Upload Media:
          <UploadVideo handleFileChange={handleFileChange} />
          {/* { progres.started && <Progress percent={progres.pc} />} */}
        </Flex>
        <div>
          <List>
            {updateData.files.map((video, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    onClick={() => handleDelete(index)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <MovieIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${video}`} />
              </ListItem>
            ))}
          </List>
        </div>
        {/* { progres.started && <progress max="100" value={progres.pc }></progress> } */}
      </form>
    </div>
  );
};

export default UpdateForm;
