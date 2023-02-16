const iso = require("../utils/iso369-1.json");

exports.getDirectors = (credits) => {
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

exports.getCast = (credits) => {
  try {
    let cast = [];
    credits.cast.map((person) =>
      person.order < 10
        ? cast.push({ name: person.name, character: person.character })
        : null
    );
    return cast;
  } catch (err) {
    console.log(err);
    return ["No Data Found"];
  }
};

exports.getLanguage = (iso_code) => {
  try {
    return iso.find((ele) => ele["639_1_code"] === iso_code);
  } catch (err) {
    return "Error with ISO Converstion";
  }
};

exports.getProviders = (streaming_on) => {
  try {
    return streaming_on.flatrate.map((provider) => provider.provider_name);
  } catch (err) {
    return ["No Data Found"];
  }
};