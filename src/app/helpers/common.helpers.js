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
    console.log(err?.message);
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
      profile_path: person?.profile_path ? `${TmdbConfig.tmdbImagesUrl}w92${person?.profile_path}` : "",
    }));
    return cast;
  } catch (err) {
    console.log(err?.message);
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
    console.log(err?.message);
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
    console.log(err?.message);
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
    console.log(err?.message);
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
    console.log(err?.message);
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
    console.log(err?.message);
    return [];
  }
};

exports.getCreators = (created_by) => {
  try {
    if (!Array.isArray(created_by) || created_by.length === 0) {
      throw new Error("Invalid input: created_by should be a non-empty array.");
    }

    return created_by.map((creator) => creator?.name?.trim()).filter(Boolean);
  } catch (err) {
    console.log(err?.message);
    return [];
  }
};


exports.getNetworks = (networks) => {
  try {
    if (!Array.isArray(networks) || networks.length === 0) {
      throw new Error("Invalid input: networks should be a non-empty array.");
    }

    const networkNames = networks.map((network) => network?.name?.trim());

    return networkNames.filter(Boolean);
  } catch (err) {
    console.log(err?.message);
    return [];
  }
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
    console.log(err?.message);
    return 0;
  }
};

exports.getVideos = ({ videosObject }) => {
  try {
    const videos = [];

    // Destructure the "results" property from "videosObject" and give it a default value of an empty array
    const { results = [] } = videosObject;

    // Check if "results" is an array and has at least one item
    if (Array.isArray(results) && results?.length > 0) {
      // Loop through each item in "results"
      for (const video of results) {
        // Destructure the properties from "video" and give them default values
        const {
          name = "",
          site = "",
          key = "",
          size = "",
          type = "",
          official = false,
          published_at = "",
        } = video;

        // Add a new object to the "videos" array with the destructured properties
        videos.push({
          name,
          site,
          key,
          size,
          type,
          official,
          published_at,
        });
      }
    }

    // Return the "videos" array
    return videos;
  } catch (err) {
    // Log any errors to the console
    console.log(err?.message);
    // Return an empty array if an error occurs
    return [];
  }
};


exports.getImages = ({ imagesObject }) => {
  try {
    const images = [];

    // Check if there are any backdrops and loop through them
    if (imagesObject?.backdrops instanceof Array && imagesObject?.backdrops?.length > 0) {
      imagesObject.backdrops.map((backdrop) => {
        // Push each backdrop to the images array with relevant information
        if (backdrop?.file_path) {
          images.push({
            aspect_ratio: backdrop?.aspect_ratio ?? 0,
            height: backdrop?.height ?? 0,
            width: backdrop?.width ?? 0,
            file_path: `${TmdbConfig.tmdbImagesUrl}original${backdrop?.file_path}`,
            type: 'backdrop',
          })
        }
      })
    };

    // Check if there are any posters and loop through them
    if (imagesObject?.posters instanceof Array && imagesObject?.posters?.length > 0) {
      imagesObject.posters.map((poster) => {
        // Push each poster to the images array with relevant information
        if (poster?.file_path) {
          images.push({
            aspect_ratio: poster?.aspect_ratio ?? 0,
            height: poster?.height ?? 0,
            width: poster?.width ?? 0,
            file_path: `${TmdbConfig.tmdbImagesUrl}original${poster?.file_path}`,
            type: 'poster',
          })
        }
      })
    };

    // Check if there are any stills and loop through them
    if (imagesObject?.stills instanceof Array && imagesObject?.stills?.length > 0) {
      imagesObject.stills.map((still) => {
        // Push each still to the images array with relevant information
        if (still?.file_path) {
          images.push({
            aspect_ratio: still?.aspect_ratio ?? 0,
            height: still?.height ?? 0,
            width: still?.width ?? 0,
            file_path: `${TmdbConfig.tmdbImagesUrl}original${still?.file_path}`,
            type: 'still',
          })
        }
      })
    };

    // Return the images array
    return images;

  } catch (err) {
    // Log any errors and return an empty array
    console.log(err?.message);
    return [];
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
  } catch (err) {
    console.log(err?.message);
    return [{ "country": "default", "ratting": "MB-26" }];
  }
};

