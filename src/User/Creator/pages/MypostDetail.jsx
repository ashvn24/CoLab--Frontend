import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatDateString, stringAvatar } from '../../../constants/Editor/utils/formater'
import { useDispatch, useSelector } from 'react-redux'
import { PostDetail } from '../../../Redux/Store/postSlice'

const MypostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { post, status, error } = useSelector((state) => state.postDetails);
    useEffect(() => {
        dispatch(PostDetail(id));
      }, []);

  return (
    <div className="flex flex-1">
  <div className="home-container">
    <div className="home-post ">
      <div className="flex w-full flex-col min-h-fit rounded-xl bg-dark-4 p-20 relative">
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-3">
            <Link>
              <Avatar
                {...stringAvatar(`${post.user.username}`)}
                className="capitalize"
              />
            </Link>
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1 capitalize">
                {post.user.username}
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {formatDateString(post.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link to={`/postDetail/${post.id}`}>
          <div className="h3-bold py-10">
            <p>{post.title}</p>
          </div>
          <div>
            <p>
              In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm
              ˈɪp.səm/) is a placeholder text commonly used to demonstrate
              the visual form of a document or a typeface without relying on
              meaningful content. Lorem ipsum may be used as a placeholder
              before the final copy is available. It is also used to
              temporarily replace text in a process called greeking, which
              allows designers to consider the form of a webpage or
              publication, without the meaning of the text influencing the
              design. Lorem ipsum is typically a corrupted version of De
              finibus bonorum et malorum, a 1st-century BC text by the Roman
              statesman and philosopher Cicero, with words altered, added,
              and removed to make it nonsensical and improper Latin. The
              first two words themselves are a truncation of dolorem ipsum
              ("pain itself"). Versions of the Lorem ipsum text have been
              used in typesetting at least since the 1960s, when it was
              popularized by advertisements for Letraset transfer sheets.
            </p>
            {/* <p>{post.description}</p> */}
          </div>
        </Link>
        
      </div>
    </div>
  </div>
</div>
  )
}

export default MypostDetail