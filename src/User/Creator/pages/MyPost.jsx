import React, { useEffect, useState } from 'react'
import Loader from '../../../Components/User/Utils/Loader';
import PostCard from '../../../Components/User/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { myPost } from '../../../Redux/Store/postSlice';


const MyPost = () => {
    const [change, setChange] = useState('')
    const dispatch = useDispatch()
    const { my_post, status, error } = useSelector((state) => state.myPostData)
    const post = my_post
    useEffect(() =>{
        dispatch(myPost())
    },[change ])
    console.log('post',my_post);

    const handleChange =(id) =>{
      setChange(id)
    }


    return (
    <>
    
    {status === 'Loading' ? (
      <Loader />
    ) : (
      <div className='flex flex-1'>
        <div className="home-container">
          <div className="home-posts">
            <h2 className='h3-bold md:h2-bold text-left w-full'>My Post</h2>
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {my_post ? my_post.map((post, key) => {
                return (
                  <li key={key}>
                    <PostCard handleChange={handleChange} post={post} />
                  </li>
                );
              }) : <p>no post available</p>}
            </ul>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default MyPost
