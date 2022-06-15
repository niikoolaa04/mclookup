const { Router } = require("express");
const router = Router();
const cookieParser = require("cookie-parser");
const { getTokensFromCode } = require("../utils/getTokensFromCode");
const { getUserFromToken } = require("../utils/getUserFromToken");
const { v4: uuid } = require("uuid");
const User = require("../models/User");
const axios = require("axios");

router.use(cookieParser());

router.get("/discord/callback", async (req, res) => {
  let code = req.query.code;
  if (!code) return res.status(404);
  let tokens = await getTokensFromCode(code);
  if (tokens.error && tokens.error === "invalid_request")
    return res.status(500);
  
  let user = await getUserFromToken(tokens.access_token);
  let userExist = false;
  await User.findOne({ userID: user.id }).then((u) => {
    if(u) userExist = true;
  });
  let avatar = '';
  if(user.avatar == null) avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
  else avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`

  async function postNow() {
    if(!userExist) {
      await axios.post(`${process.env.SERVER_DOMAIN}/api/newUser`, { 
        userID: `${user.id}`, 
        username: user.username, 
        discriminator: user.discriminator,
        hypeSquad: user.public_flags,
        avatarURL: `${avatar}`,
        nitro: user.premium_type,
        description: '',
        owner: false,
        staff: false
      }, {
        headers: {
          "Request_Token": `${process.env.SERVER_API_KEY}`,
          "Content-Type": "application/json",
      }}).catch((err) => console.log(err));
    }
  }

  await postNow();

  let uid = uuid()
  res.cookie('uuid', uid, {
    expires: new Date(Date.now()+6.048e+8),
    httpOnly: false
  })
  res.cookie('bmfA71q', tokens.access_token, {
    expires: new Date(Date.now()+6.048e+8),
    sameSite: "none",
    secure: true,
    site: "mclookup-niikoolaa04.vercel.app", httpOnly: false
  }).redirect(process.env.SERVER_REACT_DOMAIN);
});

router.get("/logout", (req, res) => {
  let uuid = req.cookies["uuid"];
  res.clearCookie("uuid");
  let bmfA71q = req.cookies["bmfA71q"];
  res.clearCookie("bmfA71q");
  res.redirect(process.env.SERVER_REACT_DOMAIN);
})

router.get('/', (req, res) => {
  if(req.user) return res.json(req.user);
  else return res.json({error:"Not logged in"});
});

module.exports = router;