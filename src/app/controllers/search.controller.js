const { searchTmdb } = require("../service/search.service");

exports.searchController = (req, res, next) => {
  try {
    searchTmdb((search = { ...req.query }))
      .then((result) => {
        res.status(200).json({ success: true, result: { ...result } });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
