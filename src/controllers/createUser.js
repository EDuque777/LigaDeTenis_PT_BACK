require('dotenv').config();
const { User } = require("../db")
const transporter = require('../middlewares/nodemailer')
const bcrypt = require("bcryptjs")
// const { createAccessToken } = require("../middlewares/jwt.js")
const {
    CLOUD_DEFAUL_IMAGE,
} = process.env;
let imageDefault = CLOUD_DEFAUL_IMAGE


const createUser = async (req, res) => {

    try {

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

        const userProfilePicture = imageprofile_picture ? imageprofile_picture : imageDefault;

        const createUser = await User.create({
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
            imageprofile_picture: userProfilePicture,
            role
        })

        await transporter.sendMail({
            from: '"Welcome to our platform" <esteban.duque911@gmail.com>',
            to: `${email}`,
            subject: "Welcome to the Tennis League",
            html:  `<h1>Hello ${namefull}</h1>
                    <p>How great to have you on board on our tennis platform! Your subscription is a vote of confidence in us.</p>
                    <p>This user was created by a platform administrator.</p>
                    <p>Get ready to live the passion of tennis!</p>`
        })
    
        // const token = await createAccessToken({id : createUser.id})
    
        // res.cookie("token", token)
        res.status(200).json({ message: "User Created Successfully"});

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    createUser
};