////////////////////////////////////////
// DATABASE QUERIES
////////////////////////////////////////

const spicedPg = require("spiced-pg");
// let username, pwd;
try {
  var { username, pwd } = require("./secrets.json");
} catch (err) {
  console.log(err);
}

////////////////////////////////////////
// SETTINGS FOR PSQL CONNECTION
////////////////////////////////////////
const dbUrl =
  process.env.DATABASE_URL ||
  `postgres:${username}:${pwd}@localhost:5432/openweather_cities`;
const db = spicedPg(dbUrl);

////////////////////////////////////////
// GETTING THE CITY NAMES
////////////////////////////////////////

module.exports.getCity = function getCity(name) {
  console.log(name);
  return db.query(
    `
    SELECT * FROM cities WHERE LOWER(name) LIKE LOWER($1 || '%')
    LIMIT 50;
    `,
    [name]
  );
};
