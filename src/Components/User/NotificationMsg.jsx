import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { stringAvatar, timeAgo } from '../../constants/Editor/utils/formater'

const NotificationMsg = ({reqs}) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-dark-4 p-7">
      <Link to={'/work'}>
      <div className="flex items-start  justify-evenly">
        <div className="flex w-full flex-1 items-center flex-row gap-3">
          <Link >
            <Avatar
              {...stringAvatar(`N`)}
              className="capitalize"
            />
          </Link>
          <p>{reqs.message}</p>
        </div>
        {/* <div className="flex  items-center mt-1 gap-6">
          {reqs.user=== ? (
            <p className="mt-1">Accepted</p>
          ) : (
            <>
              <button onClick={() => handleReject(reqs.id)}>
                <CloseCircleOutlined style={{ fontSize: "29px" }} />
              </button>
              <button onClick={() => handleRequest(reqs.id)}>
                <CheckCircleOutlined style={{ fontSize: "29px" }} />
              </button>
            </>
          )}
        </div> */}
        <div className='flex item-center'>
            <p> {timeAgo(reqs.timestamp)}</p>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default NotificationMsg
