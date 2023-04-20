const { searchTmdb } = require("../service/search.service");

exports.searchController = async (req, res, next) => {
  try {
    const result = await searchTmdb({ ...req.query });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
