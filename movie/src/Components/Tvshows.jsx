import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
function Tvshows() {
  const [category, setcategory] = useState("airing_today")
  const [tvshows, settvshows] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Flim-Flicks | tvshows" + category.toUpperCase()
  const Navigate = useNavigate()

  const Gettvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // console.log(data.results)
      // settvshows(data.results)
      if (data.results.length > 0) {
        settvshows((prev) => [...prev, ...data.results]);
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
    if (tvshows.length === 0) {
      Gettvshows()
    }
    else {
      setpage(1);
      settvshows([]);
      Gettvshows()
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category])
  return tvshows.length > 0 ?
    (
      <div className='w-screen h-screen px-[5%]'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={() => Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
            Tvshows <small className='ml-1 text-sm text-zinc-500'>({category})</small>
          </h1>
          <div className='flex items-center w-[80%]'>
            <Topnav />
            <DropDown title="Category" options={["on_the_air", "top_rated", "airing_today"]} func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>


          </div>
        </div>

        <InfiniteScroll
          dataLength={tvshows.length}
          next={Gettvshows}
          hasMore={hasMore}
          loader={<h1>loading...</h1>}
        >
          <Cards data={tvshows} title="tv" />
        </InfiniteScroll>
      </div>
    ) : <Loading />
}

export default Tvshows