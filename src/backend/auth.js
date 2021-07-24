const { Router } = require("express");
const router = Router();
const getTokensFromCode = require("../utils/getTokensFromCode.js");
const getUserInfo = require("../utils/getUserFromToken.js");
const { v4: uuid } = require("uuid");

router.get("/discord/callback", async (req, res) => {
  let code = req.query.code;
  if (!code) return res.redirect("/");
  let tokens = await getTokensFromCode(code);
  if (tokens.error && tokens.error === "invalid_request")
    return res.redirect("/");
  let userinfo = await getUserInfo(tokens.access_token);

  let uid = uuid()
  res.cookie('uuid', uid, {
    expires: new Date(Date.now()+6.048e+8)
  })
  res.cookie('qwerty_access', tokens.access_token, {
    expires: new Date(Date.now()+6.048e+8)
  })
  res.redirect('http://localhost:3000');
});

router.get("/logout", (req, res) => {
  let uuid = req.cookies["uuid"];
  res.clearCookie("uuid");
  res.redirect("/");
})
router.get('/', (req, res) => {
  if(req.user) return res.json(req.user);
  else return res.json({error:"Not logged in"});
});

module.exports = router;