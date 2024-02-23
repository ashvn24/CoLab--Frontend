import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDateString, stringAvatar } from '../../constants/Editor/utils/formater';
import update from '../../assets/icons/update.svg'
import { useSelector } from 'react-redux';
import PostAction from './Utils/PostAction';
// import PostAction from './Utils/PostAction';

const PostCard = ({ post }) => {
    const {email, user} = useSelector((state) => state.usertoken)
    
  return (
    
    <div className='flex w-full flex-col rounded-xl bg-dark-4 p-7'>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-3">
            <Link>
            <Avatar {...stringAvatar(`${post.user.username}`)} className='capitalize' />
            </Link>
            <div className='flex flex-col'>
                <p className='base-medium lg:body-bold text-light-1 capitalize'>{post.user.username}</p>
                <div className='flex-center gap-2 text-light-3'>
                <p className='subtle-semibold lg:small-regular'>{formatDateString(post.created_at)}</p>
                </div>
            </div>
        </div>
        {email === post.user.email &&
        <Link >
        <img src={update} alt="update" height={20} width={20}/>
        </Link>
        }
      </div>
      
      <Link to={user && user.role === 'Editor' ? `/postDetail/${post.id}` : `/mypostDetail/${post.id}`}>
            <div className="small-medium lg:base-medium py-5">
                <p>{post.title}</p>
            </div>
        <div>
            <p>
                {post.description}
            </p>
        </div>
        </Link>
        <PostAction email={email} post={post}/>
    </div>
    
    
  )
}

export default PostCard
