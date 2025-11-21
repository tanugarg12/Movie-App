import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function Trending() {
  const [category, setcategory] = useState("all")
  const [duration, setduration] = useState("day")
  const [trending, settrending] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Flim-Flicks | Trending" + category.toUpperCase()
  const Navigate = useNavigate()

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // settrending(data.results)
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
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
    if (trending.length === 0) {
      GetTrending()
    }
    else {
      setpage(1);
      settrending([]);
      GetTrending()
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category, duration])

  return trending.length > 0 ?
    (
      <div className='w-screen h-screen px-[5%]'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
            Trending
          </h1>
          <div className='flex items-center w-[80%]'>
            <Topnav />
            <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
            <DropDown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />

          </div>
        </div>

        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={<h1>loading...</h1>}
        >
          <Cards data={trending} title="tv" />
        </InfiniteScroll>
      </div>
    ) : <Loading />
}

export default Trending