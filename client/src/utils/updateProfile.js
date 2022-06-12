const axios = require("axios");

export const updateAllProfiles = () => {
  axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
    headers: {
      "Request_Token": `${process.env.REACT_APP_API_KEY}`
    }
  }).then((res) => {
    for(let i = 0; i < res.data.length; i++) {
      updateAllDB(res.data[i]);
    }
  })
}

export const updateAllDB = (profile) => {
  axios.get(`https://discordapp.com/api/users/${profile.userID}`, {
    headers: {
      "Authorization": `Bot ${process.env.REACT_APP_DISCORD_TOKEN}`,
      'content-type': 'application/json'
    }
  }).then((resp) => {
    let avatar = '';
    if(resp.data.avatar == null) avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
    else avatar = `https://cdn.discordapp.com/avatars/${resp.data.id}/${resp.data.avatar}.webp?size=256`;
    axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/${profile.userID}`, {
      userID: resp.data.id,
      username: resp.data.username,
      discriminator: resp.data.discriminator,
      avatarURL: avatar,
      hypeSquad: resp.data.public_flags,
      nitro: resp.data.premium_type,
      description: profile.description,
      owner: profile.owner,
      staff: profile.staff
     }, {
      headers: {
        "Request_Token": `${process.env.REACT_APP_API_KEY}`
      }
    }).catch((err) => console.log(err));
  });
}