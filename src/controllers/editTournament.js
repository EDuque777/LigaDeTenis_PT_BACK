const { Tournament } = require("../db");


const editTournament = async (req, res) => {

    try {

        const { id } = req.params
        const { name, total_participants, start_date, winner_prize, country_of_location, cover_image, subscription_price } = req.body

        await Tournament.update(
            { name, total_participants, start_date, winner_prize, country_of_location, cover_image, subscription_price },
            { where: { id } }
        );

        return res.status(200).send("Successfully edited tournament");

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    editTournament
};