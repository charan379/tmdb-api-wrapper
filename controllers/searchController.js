/**
 *	#########################################################
 *
 *      @author : charanteja379
 *      @email  : charanteja379@gmail.com
 *  	  @createedOn : 2023-01-27 12:42:28
 *      @lastModifiedOn : 2023-02-09 15:35:39
 *  	  @desc   : [description]
 *
 *  #########################################################
 */

const TmdbConfig = require('../utils/TmdbConfig');
const axios = require('axios');
 
 // build movieslist and return data
 const buildList = (tmdbdata, type) => {
   // get release year based on movie or tv show
   const getYear = (movie, type) => {
     switch (type) {
       case "movie":
         return new Date(movie.release_date).getFullYear() || 0;
       case "tv":
         return new Date(movie.first_air_date).getFullYear() || 0;
       default:
         break;
     }
   };
 
   // get title based on movie or tv show
   const getTitle = (movie, type) => {
     switch (type) {
       case "movie":
         return movie.title;
       case "tv":
         return movie.name;
       default:
         break;
     }
   };
 
   //return result with required data
   const movieList = tmdbdata.results.map((movie) => {
     return {
       tmdb_id: movie.id,
       link: `/view/tmdb/${type}/${movie.id}/${encodeURIComponent(
         (getTitle(movie, type) + "-" + getYear(movie, type)).replace(
           /[^a-zA-Z0-9]/g,
           "-"
         )
       )}`,
 
       poster_path: `${TmdbConfig.tmdbImagesUrl}w500${movie.poster_path}`,
 
       title: getTitle(movie, type),
 
       year: getYear(movie, type),
 
       ratting: movie.vote_average ||  0,
 
       titleType: type,
 
       source: "tmdb",
     };
   });
 
   return {
     currnetPage: tmdbdata.page,
     movieList,
     total_pages: tmdbdata.total_pages,
     total_results: tmdbdata.total_results,
     source: "tmdb",
   };
 };
 
 // get movies list from tmdb
 const searchTmdb = async (
   search = {
     type: "movie",
     query: "",
     year: "",
     pageNo: "",
   }
 ) => {
   //url templete
   const url = `${TmdbConfig.tmdbApiUrl}
                 search/
                 ${search.type || "movie"}?
                 api_key=${TmdbConfig.tmdbApiKey}&
                 language=${TmdbConfig.tmdbLanguage}&
                 query=${encodeURIComponent(search.query)}&
                 include_adult=false&
                 region=${TmdbConfig.tmdbRegion}
                 ${
                   search.year
                     ? (search.type === "movie"
                         ? "&year="
                         : "&first_air_date_year=") + search.year
                     : ""
                 }
                 ${search.pageNo ? "&page=" + search.pageNo : ""}`
     .replace(/\n/g, "")
     .replace(/ /g, "");
  // console.log(url)
   // return moviedata promise
   return new Promise((resolve, reject) => {
     axios
       .get(url)
       .then((result) => {
         if (result.data.total_results) {
           resolve(buildList(result.data, search.type || "movie"));
         } else {
           reject({
             message: "No Data Found",
             error: "No Data Found",
             errorType: "Empty Result",
           });
         }
       })
       .catch((error) => {
         if (axios.isCancel(error)) {
           // do nothing
         } else {
           reject(error);
         }
       });
   });
 };
 
module.exports = searchTmdb;