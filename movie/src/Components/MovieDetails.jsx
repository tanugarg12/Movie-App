import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import { useNavigate, useParams, Link, useLocation, Outlet } from "react-router-dom";
import Loading from "../Components/Loading";
import HorizontalCards from "./partials/HorizontalCards";

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();


  console.log(info)
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return (() => {
      dispatch(removemovie())
    })
  })
  return info ? (
    <div>MovieDetails</div>
  ) : (<Loading />)
}

export default MovieDetails