import React from 'react'
import './Error.css'
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen "style={{ marginTop: "-80px" }}>
     <div className="hourglassBackground ">
      <div className="hourglassContainer">
        <div className="hourglassCurves"></div>
        <div className="hourglassCapTop"></div>
        <div className="hourglassGlassTop"></div>
        <div className="hourglassSand"></div>
        <div className="hourglassSandStream"></div>
        <div className="hourglassCapBottom"></div>
        <div className="hourglassGlass"></div>
      </div>
    </div>
    <h1>page not found</h1>
    </div>
  )
}

export default Error
