import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function Popular() {

  const [category, setcategory] = useState("movie")
  const [popular, setpopular] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Flim-Flicks | Popular" + category.toUpperCase()
  const Navigate = useNavigate()

  const Getpopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      // setpopular(data.results)
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
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
    if (popular.length === 0) {
      Getpopular()
    }
    else {
      setpage(1);
      setpopular([]);
      Getpopular()
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category])

  return popular.length > 0 ?
    (
      <div className='w-screen h-screen px-[5%]'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={() => Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
            popular
          </h1>
          <div className='flex items-center w-[80%]'>
            <Topnav />
            <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
        

          </div>
        </div>

        <InfiniteScroll
          dataLength={popular.length}
          next={Getpopular}
          hasMore={hasMore}
          loader={<h1>loading...</h1>}
        >
          <Cards data={popular} title={category}/>
        </InfiniteScroll>
      </div>
    ) : <Loading />
}

export default Popular