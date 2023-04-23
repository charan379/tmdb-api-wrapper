const iso369_1_codes = require("../utils/iso369-1.json");
const TmdbConfig = require("../utils/TmdbConfig");


// get release year based on movie or tv show
exports.getYear = (movie, type) => {
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
exports.getTitle = (movie, type) => {
  switch (type) {
    case "movie":
      return movie?.title;
    case "tv":
      return movie?.name;
    default:
      break;
  }
};


exports.getDirectors = (credits) => {
  try {
    if (!credits || !credits.crew || !Array.isArray(credits.crew)) {
      throw new Error("Invalid credits data");
    }
    const directors = credits.crew.filter((person) => person.job === "Director").map((person) => person.name);
    if (!directors || directors.length === 0) {
      throw new Error("No directors found in credits");
    }
    return directors;
  } catch (err) {
    console.log(err);
    return [];
  }
};


exports.getCast = (credits) => {
  try {
    if (!credits || !credits.cast) {
      throw new Error("No cast found");
    }
    const sortedCast = credits.cast.sort((person1, person2) => person1.order - person2.order);
    const cast = sortedCast.slice(0, 12).map((person) => ({
      name: person?.name,
      character: person?.character,
      profile_path: `${TmdbConfig.tmdbImagesUrl}w92${person?.profile_path}`
    }));
    return cast;
  } catch (err) {
    console.log(err);
    return [];
  }
};


exports.getLanguage = (iso_code) => {
  try {
    const language = iso369_1_codes.find((ele) => ele.ISO_639_1_code === iso_code);
    if (language) {
      return language;
    } else {
      throw new Error("Language not found for the given ISO code");
    }
  } catch (err) {
    console.log(err);
    return { english_name: "Unknown", ISO_639_1_code: iso_code };
  }
};

exports.getProviders = (streaming_on) => {
  try {
    const flatrateProviders = streaming_on?.flatrate;
    if (!flatrateProviders) {
      throw new Error("No flatrate providers found for the given streaming service");
    }
    return flatrateProviders.map((provider) => provider.provider_name);
  } catch (err) {
    console.log(err);
    return [];
  }
};


exports.getProductionCompanies = (production_companies) => {
  try {
    if (!Array.isArray(production_companies)) {
      throw new Error("Expected an array of production companies");
    }
    return production_companies.map((company) => company.name);
  } catch (err) {
    console.error(err);
    return [];
  }
};


exports.getProductionCountries = (production_countries) => {
  try {
    if (!Array.isArray(production_countries)) {
      throw new Error("Input is not an array");
    }
    return production_countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
    return [];
  }
};

exports.getGenres = (genres) => {
  try {
    if (!Array.isArray(genres)) {
      throw new Error("No Genres Found");
    }
    return genres.map((genre) => genre.name);
  } catch (err) {
    console.log(err);
    return [];
  }
};

exports.getCreators = (created_by) => {
  if (!Array.isArray(created_by) || created_by.length === 0) {
    throw new Error("Invalid input: created_by should be a non-empty array.");
  }

  return created_by.map((creator) => creator?.name?.trim()).filter(Boolean);
};


exports.getNetworks = (networks) => {
  if (!Array.isArray(networks) || networks.length === 0) {
    throw new Error("Invalid input: networks should be a non-empty array.");
  }

  const networkNames = networks.map((network) => network?.name?.trim());

  return networkNames.filter(Boolean);
};


exports.getRuntime = (runtimeArray) => {
  try {
    if (!runtimeArray || runtimeArray.length === 0) {
      return 0;
    }
    return runtimeArray.reduce((accumulator, currentValue) => {
      return currentValue >= accumulator ? currentValue : accumulator;
    });
  } catch (err) {
    console.log(err);
    return 0;
  }
};


exports.getAgeRattings = ({ title_type = "", certifications = { results: [] } }) => {
  try {
    let age_rattings = [];
    const results = certifications?.results ?? [];
    switch (title_type) {
      case "movie":
        if (results.length > 0) {
          for (let index = 0; index < results.length; index++) {
            const result = results[index];
            const country = result?.iso_3166_1;
            const ratting = result?.release_dates[0]?.certification;
            if (country && ratting) age_rattings.push({ country, ratting })
          }
        }
        break;
      case "tv":
        if (results.length > 0) {
          for (let index = 0; index < results.length; index++) {
            const result = results[index];
            const country = result?.iso_3166_1;
            const ratting = result?.rating;
            if (country && ratting) age_rattings.push({ country, ratting });
          }
        }
        break;
      default:
        break;
    }
    if (age_rattings.length > 0) {
      return age_rattings;
    } else {
      return [{ "country": "default", "ratting": "MB-26" }];
    }
  } catch (error) {
    console.log(error);
    return [{ "country": "default", "ratting": "MB-26" }];
  }
};

