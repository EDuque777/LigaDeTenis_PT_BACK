require("dotenv").config();
const transporter = require("../middlewares/nodemailer");
const { PAYPAL_ID, PAYPAL_SECRET_KEY, PAYPAL_URL } = process.env;
const { User, Tournament } = require("../db");
const axios = require("axios");
const URL = `${PAYPAL_URL}/v2/checkout/orders`;
let info;


const createOrder = async (req, res) => {
    try {
      info = req.body;
      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: info.price,
            },
          },
        ],
        application_context: {
          brand_name: "Tennis League",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          // return_url: "http://[::1]:3001/captureOrder",
          // cancel_url: "http://[::1]:3001/cancelOrder",
          return_url: "https://ligadetenisptback-dev-jpef.4.us-1.fl0.io/captureOrder",
          cancel_url: "https://ligadetenisptback-dev-jpef.4.us-1.fl0.io/cancelOrder",
        },
      };
  
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      const {
        data: { access_token },
      } = await axios.post(`${PAYPAL_URL}/v1/oauth2/token`, params, {
        auth: {
          username: PAYPAL_ID,
          password: PAYPAL_SECRET_KEY,
        },
      });
  
      const response = await axios.post(URL, order, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

    res.send(response.data);
      
    } catch (error) {
      res.status(500).send(error.message);
    }
};

const captureOrder = async (req, res) => {

  try {
          const { token } = req.query;
          const response = await axios.post(`${URL}/${token}/capture`, {},
            {
              auth: {
                username: PAYPAL_ID,
                password: PAYPAL_SECRET_KEY,
              },
            }
          );

          await transporter.sendMail({
          from: '"THANK YOU for your purchase with us" <esteban.duque911@gmail.com>',
          to: `${info.dataUser.email}`,
          subject: "THANK YOU for your purchase with us",
          html: `<h1>Thank You for Your Purchase</h1>
            <p>Dear ${info.dataUser.full_name},</p>
            <p>You have successfully subscribed to the tournament.</p>
            <p>In your profile you can see all the tournaments you have registered for.</p>
            <h2>For a value of:</h2>
            <p>$${info.price}USD</p>`,
          });

          const tournament = await Tournament.findByPk(info.idTournament);

          if (tournament) {
            const authUser = await User.findByPk(info.dataUser.id);
          
            if (authUser) {
              let updatedTournamentsUser = authUser.tournament_participation || '';
              updatedTournamentsUser += (updatedTournamentsUser ? ', ' : '') + tournament.name;
              await authUser.update({
                tournament_participation: updatedTournamentsUser
              });
          
              let updatedParticipantsTournament = tournament.all_participants || '';
              updatedParticipantsTournament += (updatedParticipantsTournament ? ', ' : '') + authUser.id;
              await tournament.update({
                all_participants: updatedParticipantsTournament
              });
            }
          }

          // res.redirect(`http://localhost:3000/homePage/tournaments/${info.idTournament}`);
          res.redirect(`https://ligadetenisptback-dev-jpef.4.us-1.fl0.io/homePage/tournaments/${info.idTournament}`);

        } catch (error) {
          res.status(500).send(error.message);
        }

}


const cancelOrder = (req, res) => {
    // res.redirect(`http://localhost:3000/homePage/tournaments/${info.idTournament}`);
    res.redirect(`https://ligadetenisptback-dev-jpef.4.us-1.fl0.io/homePage/tournaments/${info.idTournament}`);
};



module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
};