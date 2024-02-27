import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Request } from '../../../Redux/Store/RequestSlice'
import Loader from '../../../Components/User/Utils/Loader'
import NotificationCard from '../../../Components/User/NotificationCard'

const CreatorActivity = () => {
    const { req,status,error } = useSelector((state) => state.request)
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(Request())
    console.log(req)
    }, [])
    

  return (
    <>
    {status === 'Loading' ? (
      <Loader />
    ) : (
      <div className='flex flex-1'>
        <div className="home-container">
          <div className="home-posts">
            <h2 className='h3-bold md:h2-bold text-left w-full'>My Activity</h2>
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {req ? req.map((reqs, key) => {
                return (
                  <li key={key}>
                    <NotificationCard reqs={reqs} />
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

export default CreatorActivity
