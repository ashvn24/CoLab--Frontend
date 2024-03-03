import React from 'react'
import { stringAvatar } from '../../../constants/Editor/utils/formater'
import { Link } from 'react-router-dom'
import { Avatar } from '@nextui-org/react'

const LeftChat = () => {
  return (
    // <nav className='leftsidebar h-full'>
    //   <div className="flex flex-row gap-11">
    //         <Link>
    //         <div>
    //         <Avatar {...stringAvatar('user')} className='capitalize' />
    //         </div>
    //         <div>
    //           <p className="body-bold capitalize">
    //             user
    //           </p>
    //         </div>
    //         </Link>
    //     </div>
    // </nav>
    <>
    <nav className='md:flex px-6 py-5 flex-col justify-between min-w-[210px] min-h-[610px] rounded-tl-3xl rounded-bl-3xl bg-dark-4'>

    </nav>
    </>
  )
}

export default LeftChat
