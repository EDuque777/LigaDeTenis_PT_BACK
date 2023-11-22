const { Tournament } = require("../db");

const allTournaments = async (req, res) => {

    try {

        const dbTournaments = await Tournament.findAll({
            attributes: [
                "id",
                "name",
                "total_participants",
                "start_date",
                "all_participants",
                "winner_prize",
                "country_of_location",
                "cover_image",
                "subscription_price"
            ],
        });

        return res.status(200).json(dbTournaments);

    } catch (error) {
        res.status(500).send(error.message);
    }
}



const allTournamentParticipants = async(req, res) => {

    try {

        const { id } = req.body

        const existingTournament = await Tournament.findByPk(id);

        const participants = existingTournament.all_participants;

        return res.status(200).json({ participants });
        
    } catch (error) {
        res.status(500).send(error.message);
    }

}


module.exports = {
    allTournaments,
    allTournamentParticipants
};