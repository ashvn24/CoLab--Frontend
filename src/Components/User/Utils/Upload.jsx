
import React from 'react'

const UploadVideo = ({handleFileChange = () => {}}) => {


  return (
    <div>
      <label className="relative mt cursor-pointer">
      <input
          name='files'
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <div className="border border-dotted border-gray-400 w-full h-40 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l9-5-9-5-9 5 9 5z"
              transform="matrix(1 0 0 -1 0 24)"
            />
          </svg>
          <p className="text-gray-600">Upload your image</p>
        </div>
      </label>
    </div>
  )
}

export default UploadVideo

