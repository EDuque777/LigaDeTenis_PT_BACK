const { User } = require("../db");

const allUsers = async (req, res) => {

    try {

        const allUsers = await User.findAll({
            attributes: [
                "id",
                "name",
                "last_name",
                "full_name",
                "mobile_phone",
                "birthdate",
                "email",
                "password",
                "confirm_password",
                "username",
                "nationality",
                "gender",
                "imageprofile_picture",
                "locked",
                "tournament_participation",
                "role",
            ],
        });

        return res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).send(error.message);
    }
}



const allUsersParticipation = async(req, res) => {

    try {

        const { id } = req.body

        const existingUser = await User.findByPk(id);

        const participantsTournaments = existingUser.tournament_participation;
        
        return res.status(200).json({ participantsTournaments });

    } catch (error) {
        res.status(500).send(error.message);
    }

}


module.exports = {
    allUsers,
    allUsersParticipation
};