import React from "react";
import deleteicon from "../../../assets/icons/delete.svg";
import save from "../../../assets/icons/save.svg";



const PostAction = ({ email, post }) => {
  console.log(email);
  return (
    <div className="flex items-end justify-end z-20">
      <div className="flex gap-2">
      {email === post.user.email ?
        <img
        src={deleteicon}
        alt="delete"
        height={20}
        width={20}
        onClick={() => {}}
        className="cursor-pointer"
      />
        :
        <img
        src={save}
        alt="save"
        height={20}
        width={20}
        onClick={() => {}}
        className="cursor-pointer"
      />
      }
      </div>
    </div>
  );
};

export default PostAction;
