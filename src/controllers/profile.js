const { User } = require("../db");

const profile = async (req, res) => {

    try {

        const { id } = req.params;

        const dbUser = await User.findByPk(id, {
            attributes: [
            "id",
            "name",
            "last_name",
            "full_name",
            "mobile_phone",
            "birthdate",
            "email",
            "username",
            "nationality",
            "gender",
            "imageprofile_picture",
            "tournament_participation",
            "role"
        ]
        });

        return res.status(200).json(dbUser);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    profile
};