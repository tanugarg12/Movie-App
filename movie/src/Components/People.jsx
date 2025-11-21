import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function People() {
  const [category, setcategory] = useState("popular")
  const [people, setpeople] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "Flim-Flicks | People" + category.toUpperCase()
  const Navigate = useNavigate()

  const Getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      console.log(data.results);
      
      setpeople(data.results)
      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
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
    if (people.length === 0) {
      Getpeople()
    }
    else {
      setpage(1);
      setpeople([]);
      Getpeople()
    }
  }
  useEffect(() => {
    refreshHandler()
  }, [category])
  return people.length > 0 ?
  (
    <div className='w-screen h-screen px-[5%]'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
          People <small className='ml-1 text-sm text-zinc-500'>({category})</small> 
        </h1>
        <div className='flex items-center w-[80%]'>
          <Topnav />
     


        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={Getpeople}
        hasMore={hasMore}
        loader={<h1>loading...</h1>}
      >
        <Cards data={people} title="people" />
 
      </InfiniteScroll>
    </div>
  ) : <Loading />
}

export default People