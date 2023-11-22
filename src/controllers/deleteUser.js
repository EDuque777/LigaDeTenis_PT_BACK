const { User } = require("../db");

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params

        const dbUser = await User.findByPk(id);

        await dbUser.destroy();

        return res.status(200).send(id);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    deleteUser
};