const { User } = require("../db");


const blockUser = async (req, res) => {

    try {

        const { id } = req.params

        const { locked } = req.body

        const blockedUser = await User.update(
            { locked },
            { where: { id } }
        );

        return res.status(200).send(blockedUser);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    blockUser
};