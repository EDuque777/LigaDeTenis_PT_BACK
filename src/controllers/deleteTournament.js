const { Tournament, User } = require("../db");

const deleteTournament = async (req, res) => {

    try {

        const { id } = req.params

        const dbTournaments = await Tournament.findByPk(id);

        await dbTournaments.destroy();

        return res.status(200).send(id);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    deleteTournament
};