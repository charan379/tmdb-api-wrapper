const iso = require("../utils/iso369-1.json");
const TmdbConfig = require("../utils/TmdbConfig");

exports.getDirectors = (credits) => {
  try {
    let directors = [];
    credits.map((person) =>
      person.job === "Director" ? directors.push(person.name) : null
    );
    return directors;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.getCast = (credits) => {
  try {
    let cast = [];
    const sortedCast = credits.cast.sort((person1, person2) => (person1.order > person2.order) ? 1 : (person1.order < person2.order) ? -1 : 0);

    for (let i = 0; i < 12; i++) {
      if (!sortedCast[i]) break;
      cast.push({ name: sortedCast[i]?.name, character: sortedCast[i]?.character, profile_path: `${TmdbConfig.tmdbImagesUrl}w92${sortedCast[i]?.profile_path}` })
    }
    return cast;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.getLanguage = (iso_code) => {
  try {
    return iso.find((ele) => ele["ISO_639_1_code"] === iso_code);
  } catch (err) {
    return "Error with ISO Converstion";
  }
};

exports.getProviders = (streaming_on) => {
  try {
    return streaming_on.flatrate.map((provider) => provider.provider_name);
  } catch (err) {
    return null;
  }
};

exports.getProductionCompanies = (production_companies) => {
  try {
    return production_companies.map((company) => company.name);
  } catch (error) {
    return null;
  }
};

exports.getProductionCountries = (production_countries) => {
  try {
    return production_countries.map((country) => country.name);
  } catch (error) {
    return null;
  }
};

exports.getGenres = (genres) => {
  try {
    return genres.map((genre) => genre.name);
  } catch (error) {
    return ["Unknown"];
  }
};

exports.getCreators = (created_by) => {
  try {
    return created_by.map((creator) => creator.name);
  } catch (error) {
    return null;
  }
};

exports.getNetworks = (networks) => {
  try {
    return networks.map((network) => network.name);
  } catch (error) {
    return null;
  }
};

exports.getRuntime = (runtimeArray) => {
  try {
    runtimeArray.reduce((accumlator, currentValue) => {
      return currentValue >= accumlator ? currentValue : accumlator;
    });
  } catch (error) {
    return 0;
  }
};

exports.getAgeRattings = ({ title_type, certifications }) => {

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

    return [{ "country": "default", "ratting": "MB-26" }];

  }
}