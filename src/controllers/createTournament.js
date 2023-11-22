const { Tournament } = require("../db");
const {
    CLOUD_DEFAUL_COVERIMAGE,
} = process.env;
let imageDefault = CLOUD_DEFAUL_COVERIMAGE


const createTournament = async (req, res) => {

    try {

        const { name, total_participants, start_date, winner_prize, country_of_location, cover_image, subscription_price } = req.body

        const userCoverPicture = cover_image ? cover_image : imageDefault;

        await Tournament.create({
            name,
            total_participants,
            start_date,
            winner_prize,
            country_of_location,
            cover_image: userCoverPicture,
            subscription_price
        })

        return res.status(200).send("Successfully created tournament");

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    createTournament
};