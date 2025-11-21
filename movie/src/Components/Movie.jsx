import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function Movie() {
  const [category, setcategory] = useState("now_playing")
  const [movie, setmovie] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Flim-Flicks | Movie" + category.toUpperCase()
  const Navigate = useNavigate()

  const Getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // console.log(data.results);
      
      // setmovie(data.results)
      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      }
      else {
        sethasMore(false)
      }
    }
    catch (err) {
      console.log(err);

    }
  }

  const refreshHandler = () => {
    if (movie.length === 0) {
      Getmovie()
    }
    else {
      setpage(1);
      setmovie([]);
      Getmovie()
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category])
  return movie.length > 0 ?
    (
      <div className='w-screen h-screen px-[5%]'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={() => Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
            Movies <small className='ml-1 text-sm text-zinc-500'>({category})</small> 
          </h1>
          <div className='flex items-center w-[80%]'>
            <Topnav />
            <DropDown title="Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>


          </div>
        </div>

        <InfiniteScroll
          dataLength={movie.length}
          next={Getmovie}
          hasMore={hasMore}
          loader={<h1>loading...</h1>}
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    ) : <Loading />
}

export default Movie