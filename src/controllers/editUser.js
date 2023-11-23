const { User } = require("../db")
const bcrypt = require("bcryptjs")
// const { createAccessToken } = require("../middlewares/jwt.js")


const editUser = async (req, res) => {

    try {

        const { id } = req.params

        const { 
            name, 
            last_name, 
            mobile_phone, 
            birthdate,
            email,
            password,
            confirm_password,
            username,
            nationality,
            gender,
            imageprofile_picture,
            role
        } = req.body

        const namefull = [name, last_name].filter(Boolean).join(' ')

        const salt = await bcrypt.genSalt(12)

        const cripto = await bcrypt.hash(password, salt)

        await User.update(
            {   
                name, 
                last_name, 
                full_name: namefull,
                mobile_phone, 
                birthdate,
                email,
                password: cripto,
                confirm_password,
                username,
                nationality,
                gender,
                imageprofile_picture,
                role
            },
            { where: { id } }
        );

        // const token = await createAccessToken({ id });
    
        // res.cookie("token", token)
        res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    editUser
};