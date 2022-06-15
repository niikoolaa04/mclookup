# MCLookup

Website from which you can see information about Minecraft Servers & Players. View Server's Player Count, Plugins (if public), icon, MoTD & much more.    
From Player Lookup you can view Player's Skin, Username History, Cape, Avatar and more! 
Authenticate yourself through Discord, view list of all authenticated users, customise your profile & more!
Website is built with React, Express & data is saved in MongoDB (Mongoose).

✨ **Live Demo:** https://mclookup-app.herokuapp.com/

## Setup of Backend & Frontend
### Server Installation
1. Run `npm install` command in server directory
2. Make `.env` file in server directory and fill as so:  
2.1 `SERVER_MONGO_URL=<MongoDB URL>`    
2.2 `SERVER_DOMAIN=<Domain of your backend/server with port>`    
2.2 `SERVER_REACT_DOMAIN=<URL of your frontend/client>`  
2.3 `PORT=<Whatever Port you want>`  
2.4 `SERVER_API_KEY=<Some super secret & strong string, used for API Calls from Frontend>`  
2.5 `SERVER_CLIENT_ID=<Discord Bot Application Client ID>`  
2.5 `SERVER_CLIENT_SECRET=<Discord Bot Application Secret>`  

### Client Installation
1. Run `npm install` command in client directory
2. Make `.env` file in client directory and fill as so:  
2.1 `REACT_APP_SERVER_DOMAIN=<URL of your backend/server with port>`  
2.1 `REACT_APP_OAUTH2_URL=<Discord Bot Application OAuth2 URL>`  
2.1 `REACT_APP_API_KEY=<SERVER_API_KEY from backend/server .env>`  

## Other Information
 - If you like this website feel free to star repo ;D

## Useful Links
- React: https://reactjs.org/
- Discord Developer Portal: https://discord.com/developers/applications/
- Express: https://expressjs.com/
