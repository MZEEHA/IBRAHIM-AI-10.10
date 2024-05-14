const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1SSFVCYXNTQUEyTm42S092THVwbTdKZ0NsVE5ZbHFnNTdKTWNlUTZYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlFDTlJONENzelh0ZUIyT21kT1o4NUZIMEM5RWdzOGtPRVg1WDNza0lEdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSjJpLytIQkRydTFSM2s1eUZFcHNML1BxMS8rQ0tmUWZ3WVd0cWdtVWtZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSFZBZTZKVGYvT3dRa2tPVmM3NmxDbnpzWEQ3OHkrQm9PallKSlBoRlNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklIb3Nya2hMSDV0dlFYdGxyTUFIZ1JQRklhazVwM1c5YVpQSy9tQUxWbEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBPNHFpRktoRWdqck9abDV4aWIzbit1ZHNZL0dwMFNDQkE2RjZ0MSt6UjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0tpUVZLQnV0WVNPUzdPSVZVLzA4VTZRa2RmNUxxajY0MXRhQjFTR3VYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUdBZDlYTGxUK25ma2NTcHgweUkvWmRJN0pJN0FJcDdxSmhCcFNkUEN4QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZJaVFBbTVzZnlTTmJIWjdCT1JTUkQ1eVRvQzNxVDRucXBRYUl3UlNTTXprNWVpdk1qRGxjUVl1bVNhT0l2Z3pyNWxhdGZMOUJJdXMrUDQ5UUlrVkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiI4ajJ5RkNBazEwUXk0amdadHdERFZQYXNjNVhwRm9SakJHQ0J1elVYRmRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJicmU0WVZQNlJjeVNKc1dnWnB0elJRIiwicGhvbmVJZCI6IjY5NmNjMzljLWRlNzgtNGIzNS1iOTFmLTdjYTIyMzE4YmMzNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTXRsbGVYSEZYdFByUnlRSGVPTW11cTBFUmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFVmc1BoWDlJNGR5c2ZSWTZkbjltY2xWWUtzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1BWDcxS0szIiwibWUiOnsiaWQiOiIyNTQ3MDI3MDAwNzI6MTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qk/CdkKHwnZCeIPCdkJ3wnZCa8J2Qq/CdkKTwnZCa8J2Qq/CdkKbwnZCyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOTzYzS29ERUxiMWlySUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOV2w4UEcrd3VVbWRnWkhMakJLTlhiU2ROYVJ0Zm12dEpRZExBNWp6MldZPSIsImFjY291bnRTaWduYXR1cmUiOiJoNlUwMDV2Mys1UDZwSDNMUlN6Ky9sQ3B6bzVqSzRySmlvVG5tbG1jTnZpU045Um1KOVd3TGJiWkNEVEF3U1RBL2Y1UUJrbHV3MUV5L3RjendaN0JEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNFNBTWR4Y1phRjRDODVscURsOEpZTjkzYzloYXl6L2ErcWRERG1qN0pxaHhOckZPLzhhTU5zVDdyWWhsMWRpZXlmM3pBZFFsamlpL24xUXBDSkFZQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MDI3MDAwNzI6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFZwZkR4dnNMbEpuWUdSeTR3U2pWMjBuVFdrYlg1cjdTVUhTd09ZODlsbSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTY0OTIyMH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Nairobian Goon",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254702700072",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
