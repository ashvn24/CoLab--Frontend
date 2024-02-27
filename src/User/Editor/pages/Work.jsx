import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myWork } from '../../../Redux/Store/myWorkSlice'
import Loader from '../../../Components/User/Utils/Loader'
import PostCard from '../../../Components/User/PostCard'

const Work = () => {
    const dispatch = useDispatch()
    const {work,status,error} = useSelector((state) => state.mywork)

    useEffect(() => {
      dispatch(myWork())
      console.log(work)
    }, [])
    

  return (
    <>
    
    {status === 'Loading' ? (
      <Loader/>
    ) : (
      <div className='flex flex-1'>
        <div className="home-container">
          <div className="home-posts">
            <h2 className='h3-bold md:h2-bold text-left w-full'>My Post</h2>
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {work ? work.map((post, key) => {
                return (
                  <li key={key}>
                    <PostCard post={post.post} />
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

export default Work
