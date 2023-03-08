const { searchTmdb } = require("../service/search.service");

exports.searchController = async (req, res, next) => {
  try {
    await searchTmdb((search = { ...req.query }))
      .then((result) => {
        res.status(200).json(result);
      })
  } catch (error) {
    next(error)
  }
};
