const { Router } = require("express");
const router = Router();
const { getTokensFromCode } = require("../utils/getTokensFromCode");
const { v4: uuid } = require("uuid");

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