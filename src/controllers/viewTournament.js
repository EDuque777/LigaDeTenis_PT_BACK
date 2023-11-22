const { Tournament } = require("../db");

const viewTournament = async (req, res) => {

    try {

        const { id } = req.params;

        const dbTournament = await Tournament.findByPk(id, {
            attributes: [
                "name",
                "total_participants",
                "start_date",
                "all_participants",
                "winner_prize",
                "country_of_location",
                "cover_image",
                "subscription_price"
            ]
        });

        return res.status(200).json(dbTournament);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    viewTournament
};