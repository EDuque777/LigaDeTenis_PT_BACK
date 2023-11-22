const { Router } = require('express');

const router = Router();
const { authRegister } = require("../controllers/authRegister");
const { authLogin } = require("../controllers/authLogin")
const { authLogout } = require("../controllers/authLogout")
const { cancelOrder, createOrder, captureOrder } = require('../controllers/paypalControllers')
const { allUsers, allUsersParticipation } = require("../controllers/allUsers")
const { allTournaments, allTournamentParticipants } = require("../controllers/allTournaments")
const { createTournament } = require("../controllers/createTournament")
const { editTournament } = require("../controllers/editTournament")
const { deleteTournament } = require("../controllers/deleteTournament")
const { upload, uploadPhoto  } = require('../controllers/uploadPhoto');
const { createUser } = require("../controllers/createUser")
const { editUser } = require("../controllers/editUser")
const { deleteUser } = require("../controllers/deleteUser")
const { blockUser } = require("../controllers/blockUser")
const { profile } = require("../controllers/profile")
const { viewTournament } = require("../controllers/viewTournament")


//Rutas de Registro e inicio de sesion
router.post("/auth/register", authRegister);
router.post("/auth/login", authLogin);
router.post("/auth/logout", authLogout);


//visibilidad del usuario
router.get("/profile/:id", profile);
router.get("/viewTournament/:id", viewTournament)



//Panel Administrativo
//Usuarios
router.get("/allUsers", allUsers);
router.get("/allUsersParticipation", allUsersParticipation);
router.post("/createUser", createUser);
router.put("/editUser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/blockUser/:id", blockUser);

//Torneos
router.get("/allTournaments", allTournaments);
router.post("/createTournament", createTournament);
router.put("/editTournament/:id", editTournament);
router.delete("/deleteTournament/:id", deleteTournament);
router.get("/allTournamentParticipants", allTournamentParticipants);


//Pasarela de pagos PayPal
router.post('/createOrder', createOrder);
router.get('/captureOrder', captureOrder);
router.get('/cancelOrder', cancelOrder);


//Carga de Imagenes
router.post('/upload', upload.single('file'), uploadPhoto)




module.exports = router;