import React from 'react'
import { Link } from 'react-router-dom'

function Header({ data }) {
  return (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }} className='bg-black w-full h-[60vh] flex flex-col justify-end p-[6.5%] items-start'>


      <h1 className='w-[70%] text-5xl text-white'>{data.original_title || data.title || data.name || data.original_name}</h1>
      <p className='text-white w-[70%]'>{data.overview.slice(0,260)}...
        <Link className='text-blue-500'>more</Link>
      </p>

      <p><i className="text-yellow-400 ri-megaphone-fill"></i>{data.release_date || "No information"}</p>
      <p><i className="text-yellow-400 ri-album-line"></i>{data.media_type.toUpperCase()}</p>

      <Link className='text-white p-4 mt-4 bg-[#DD4343]'>Watch Trailer</Link>
    </div>
  )
}

export default Header