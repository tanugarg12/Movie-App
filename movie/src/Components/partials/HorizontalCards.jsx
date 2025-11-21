
import React from 'react'
import { Link } from 'react-router-dom'

function HorizontalCards({ data }) {
  console.log(data)
  return (
    <div className='w-full  p-5' >
      <div className='mb-5'>
        <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>
      </div>
      <div className='w-[100%] flex overflow-y-hidden'>
        {data.length > 0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] bg-zinc-900 mr-5 mb-5 rounded-lg'>

            <img className='w-full h-[55%] object-cover' src={`https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`} alt="" />

            <div className=' text-white p-3 h-62'>
              <h1 className='text-xl font-semibold'>
                {d.title || d.name || d.original_name || d.original_title}
              </h1>
              <p className='text-sm'>
                {d.overview.slice(0, 49)}...
                <span className='text-zinc-500'>more</span>
              </p>
            </div>
          </Link>
        )) : <h1>nothing to show</h1>}
      </div>
    </div>
  )
}

export default HorizontalCards