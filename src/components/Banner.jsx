import React from 'react'
import Lines from '../Assets/threeLines.png'
function Banner() {
  return (
    <div className='flex justify-between items-center bg-white px-16  h-60 max-w-6xl w-full m-auto rounded-3xl'>
        <span>
            <h1 className='text-3xl font-bold max-w-lg'>"Unlock Your Potential: Register  Now for Expert Tutorials!"</h1>
        </span>
        <button className='flex flex-col justify-center items-center gap-4'>
            <img src={Lines} alt="" />
            <p className='  py-3 px-5 rounded-2xl font-medium bg-lightblue'>REGISTER NOW.!!</p>
            <img src={Lines} alt=""  className='rotate-180'/>
        </button>
    </div>
  )
}

export default Banner