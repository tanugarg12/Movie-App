import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDc0Nzc5ZDZjM2EyZmMyMzgxNzE4YTZlMWQ3YTRlZiIsIm5iZiI6MTczODkxMzgzOC41NjYwMDAyLCJzdWIiOiI2N2E1YjgyZWFjYTkxZGE0YmE4NWQ1ZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kL8ztn3Q3RDlDRmjN57ai4vQhVDOpAwzmBV_NUp8Ycg'
  }
})
export default instance