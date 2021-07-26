const axios = require("axios");

function updateProfile(id) {
  axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/database/users`).then((res) => {
    console.log(res.data)
    console.log('OLD DATA')
    for(let i = 0; i < res.data.length; i++) {
      updateAllProfiles(res.data[i]);
    }
  })
}

function updateAllProfiles(profile) {
  axios.get(`https://discordapp.com/api/users/${profile.userID}`, {
    headers: {
      "Authorization": `Bot ***REMOVED***`,
      'content-type': 'application/json'
    }
  }).then((resp) => {
    let avatar = '';
    if(resp.data.avatar == null) avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
    else avatar = `https://cdn.discordapp.com/avatars/${resp.data.id}/${resp.data.avatar}.webp?size=256`
    axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/database/users/${profile.userID}`, { 
      userID: resp.data.id,
      username: resp.data.username,
      avatarURL: avatar,
      hypeSquad: resp.data.public_flags,
      nitro: resp.data.premium_type
     }).catch((err) => console.log(err));
     console.log(resp)
     console.log(resp.data.id)
  });
}

module.exports = {
  updateAllProfiles,
  updateProfile,
}