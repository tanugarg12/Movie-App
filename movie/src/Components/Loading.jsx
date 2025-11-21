import React from 'react'
import loader from '/loader.gif'

function Loading() {
  return (
    <div className='w-screen h-screen flex justify-center bg-black items-center'>
      <img className='h-[50%] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading