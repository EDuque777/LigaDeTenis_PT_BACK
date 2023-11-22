const { User } = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createAccessToken } = require("../middlewares/jwt.js")

const authLogin = async (req, res) => {
    try {

        const {emailLogin, passwordLogin} = req.body

        const existingUser = await User.findOne({
            where : {
                email: emailLogin
            }
        })
            
        if (!existingUser) {
                
            res.status(400).send("Username does not exist!!!")
            
        }else{    

            const comparePassword = await bcrypt.compare(passwordLogin, existingUser.password)

            if (!comparePassword) {
                    
                res.status(401).send("Invalid password")

            } else {

                const token = await createAccessToken({id : existingUser.id})
                    
                res.cookie("token", token)
                    res.status(200).json({ message: "Session started", userId: existingUser.id, token });
                }
            }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    authLogin
}