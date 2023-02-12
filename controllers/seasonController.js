const axios = require('axios');
const TmdbConfig = require('../utils/TmdbConfig');

const buildTvSeason = (tvSeason) => {

    return({
        tmdbId : tvSeason.id,
        seasonNumber : tvSeason.season_number,
        name : tvSeason.name,
        releaseDate : tvSeason.air_date, 
        posterPath : `${TmdbConfig.tmdbImagesUrl}w342/${tvSeason.poster_path}`,
        overview : tvSeason.overview,
        episodes : tvSeason.episodes.map(episode => buildEpisode(episode))
    })
}

const getDirectors = (crew) => {
    try {
      let directors = [];
      crew.map((person) =>
        person.job === "Director" ? directors.push(person.name) : null
      );
      return directors;
    } catch (err) {
      console.log(err);
      return ["No Data Found"];
    }
  };

const buildEpisode = (episode) =>{
    

    return({
        tmdbId : episode.id,
        episodeNumber : episode.episode_number,
        name : episode.name,
        overview : episode.overview,
        seasonNumber : episode.season_number,
        tmdbShowId : episode.show_id,
        stillPath : `${TmdbConfig.tmdbImagesUrl}w300/${episode.still_path}`,
        airDate : episode.air_date,
        runtime : episode.runtime,
        directors : getDirectors(episode.crew)
    })
}

const getTmdbTvSeason = ({ tmdb_tv_id, season_number }) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                  tv/${tmdb_tv_id}
                  /season/${season_number}
                  ?api_key=${TmdbConfig.tmdbApiKey}`
                  .replace(/\n/g, "")
                  .replace(/ /g, "");

   return new Promise((resolve, reject) => { 
        axios.get(url)
        .then(result =>{
            resolve(buildTvSeason(result.data))
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // do nothing
          } else {
            reject(error);
          }
        })
    })
};


module.exports = getTmdbTvSeason;