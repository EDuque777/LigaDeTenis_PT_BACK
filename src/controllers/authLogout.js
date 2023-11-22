const authLogout = (req, res, next) => {

    req.session.destroy(err => {
        if (err) {
            return res.send("There was a mistake")
        }
        res.cookie("token", "", {
            expires : new Date(0)
        })
        res.send("Closed session")
    })

}

module.exports = {
    authLogout
}