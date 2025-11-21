import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import Tvshows from './Components/Tvshows'
import People from './Components/People'
import AboutUs from './Components/AboutUs'
import MovieDetails from './Components/MovieDetails'
import TvDetails from './Components/TvDetails'
import PersonDetails from './Components/PersonDetails'

function App() {
  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />} />
        <Route path='/tv' element={<Tvshows />} />
        <Route path='/tv/details/:id' element={<TvDetails />} />

        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<PersonDetails />} />

        <Route path='/aboutus' element={<AboutUs />} />




      </Routes>
    </div>
  )
}

export default App