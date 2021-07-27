const { Router } = require("express");
const router = Router();
const { getTokensFromCode } = require("../utils/getTokensFromCode");
const { getUserFromToken } = require("../../client/src/utils/getUserFromToken");
const { v4: uuid } = require("uuid");
const User = require("../models/User");
const axios = require("axios");

router.get("/discord/callback", async (req, res) => {
  let code = req.query.code;
  if (!code) return res.redirect(process.env.SERVER_REACT_DOMAIN);
  let tokens = await getTokensFromCode(code);
  if (tokens.error && tokens.error === "invalid_request")
    return res.redirect(process.env.SERVER_REACT_DOMAIN);

  let uid = uuid()
  res.cookie('uuid', uid, {
    expires: new Date(Date.now()+6.048e+8)
  })
  res.cookie('qwerty_access', tokens.access_token, {
    expires: new Date(Date.now()+6.048e+8)
  })

  let user = await getUserFromToken(tokens.access_token);
  console.log(user.id)
  let userExist = false;
  User.findOne({ userID: user.id }).then((u) => {
    if(u) userExist = true;
  });
  let avatar = '';
  if(user.avatar == null) avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
  else avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`

  async function postNow() {
    await axios.post(`${process.env.SERVER_DOMAIN}/database/newUser`, { 
      userID: user.id, 
      username: user.username, 
      discriminator: user.discriminator,
      hypeSquad: user.public_flags,
      avatarURL: avatar,
      nitro: user.premium_type
    }, {
      headers:{
        "Content-Type": "application/json",
    }}).then(() => console.log('New User Added to Mongoose DB')).catch((err) => console.log(err));
  }

  if(userExist == false) await postNow();

  res.redirect(process.env.SERVER_REACT_DOMAIN);
});

router.get("/logout", (req, res) => {
  let uuid = req.cookies["uuid"];
  res.clearCookie("uuid");
  let qwerty_access = req.cookies["qwerty_access"];
  res.clearCookie("qwerty_access");
  res.redirect(process.env.SERVER_REACT_DOMAIN);
})

router.get('/', (req, res) => {
  if(req.user) return res.json(req.user);
  else return res.json({error:"Not logged in"});
});

module.exports = router;