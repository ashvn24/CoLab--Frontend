import React from 'react'
import post from "../../../assets/icons/post.svg";
import PostForm from '../../../Components/User/PostForm';

const CreatePost = () => {
  return (
    <div className='flex flex-1 '>
      <div className="common-container">
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src={post} alt="post"
          width={36}
          height={36}
           />
           <h3 className="h3-bold md:h2-bold text-left w-full">Create Post</h3>
        </div>
        <PostForm/>
      </div>
    </div>
  )
}

export default CreatePost
