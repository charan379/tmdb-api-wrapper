const axios = require('axios');
const TmdbConfig = require('../utils/TmdbConfig');
const iso = require('../utils/iso369-1.json');

const buildTv = (tvData) => {
  const tv = {
    source: "tmdb",

    tmdbId: tvData.id,

    imdbId: tvData.imdb_id,

    posterPath: `${TmdbConfig.tmdbImagesUrl}w500${tvData.poster_path}`,

    tagline: tvData.tagline,

    title: tvData.name,
    
    originalTitle: tvData.original_name,

    genres: tvData.genres,

    originalLanguage: getLanguage(tvData.original_language),

    languages : tvData.languages.map(language => getLanguage(language)),

    titleType: "tv",

    production_companies: tvData.production_companies,

    productionCountries: tvData.production_countries,

    status: tvData.status,

    releaseDate: tvData.first_air_date,

    year: tvData.first_air_date
      ? new Date(tvData.first_air_date).getFullYear()
      : null,

    runtime: tvData.episode_run_time + " minutes",

    overview: tvData.overview,

    providers: getProviders(tvData["watch/providers"].results.IN),

    directors: getDirectors(tvData.credits),

    cast: getCast(tvData.credits),

    inProduction : tvData.in_production,

    createdBy : tvData.created_by,

    lastAiredDate : tvData.last_air_date,

    lastEpisodeAired :  tvData.last_episode_to_air ? {
      ...tvData.last_episode_to_air, still_path : `${TmdbConfig.tmdbImagesUrl}w300${tvData.last_episode_to_air.still_path}`
    } : null,

    nextEpisodeToAir : tvData.next_episode_to_air ? {
      ...tvData.next_episode_to_air , still_path : `${TmdbConfig.tmdbImagesUrl}w300${tvData.next_episode_to_air.still_path}`
    } : null,

    networks : tvData.networks,

    numberOfSeasons : tvData.number_of_seasons || 0,

    numberOfEpisodes : tvData.number_of_episodes || 0,

    seasons : tvData.seasons.map(season => {
      return ({
        ...season, poster_path : `${TmdbConfig.tmdbImagesUrl}/w300/${season.poster_path}`, tmdb_show_id : tvData.id
      })
    }),
  };

  return tv;
};

const getProviders = (streaming_on) => {
  try {
    return streaming_on.flatrate.map((provider) => provider.provider_name);
  } catch (err) {
    return ["No Data Found"];
  }
};

const getDirectors = (credits) => {
  try {
    let directors = [];
    credits.crew.map((person) =>
      person.job === "Director" ? directors.push(person.name) : null
    );
    return directors;
  } catch (err) {
    console.log(err);
    return ["No Data Found"];
  }
};

const getCast = (credits) => {
  try {
    let cast = [];
    credits.cast.map((person) =>
      person.order < 4
        ? cast.push({ name: person.name, character: person.character })
        : null
    );
    return cast;
  } catch (err) {
    console.log(err);
    return ["No Data Found"];
  }
};

const getLanguage = (iso_code) => {
  try {
    return iso.find((ele) => ele["639_1_code"] === iso_code);
  } catch (err) {
    return "Error with ISO Converstion";
  }
};

const getTmdbTv = (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                tv/
                ${tmdb_id}
                ?api_key=${TmdbConfig.tmdbApiKey}&
                append_to_response=watch/providers,credits`
                .replace(/\n/g, "")
                .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(buildTv(response.data));
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

module.exports = getTmdbTv;