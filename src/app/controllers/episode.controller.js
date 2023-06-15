const { getTmdbTvSeasonEpisode } = require("../service/episode.service");

exports.episodeController = async (req, res, next) => {
    try {
        const result = await getTmdbTvSeasonEpisode({
            tmdb_show_id: req?.params?.tmdb_show_id,
            season_number: req?.params?.season_number,
            episode_number: req?.params?.episode_number
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}