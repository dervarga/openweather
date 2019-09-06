const express = require("express");
const app = express();
const getWeather = require("./utils/getweather");
const logCities = require("./utils/logcities");
const searchCity = require("./utils/searchCity");
const db = require("./utils/db");
const port = 8080;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
//
// app.use("*", (req, res) => {
//   res.redirect("/");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let mainResult = {
  wResult: {}
};

////////////////////////////////////////
// ROUTES
////////////////////////////////////////

app.get("/city", (req, res) => {
  console.log("/city request came in", req.query);
  let searchField = req.query.q;

  // IF Heroku free plan would handle big database, I would use this
  //
  // db.getCity(searchField)
  //   .then(rslt => {
  //     // console.log(rslt.rows);
  //     res.json(rslt.rows);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });

  let citiesResult = logCities.logCities(searchField);
  res.send(citiesResult);
});

// app.get("/init", (req, res) => {
//   logCities.getCurPosIpGeo((err, rslt) => {
//     if (err) {
//       console.log("getCurPosIpGeo cb ERROR: ", err);
//       // let cLat = parseFloat(req.query.q.latitude);
//       // let cLon = parseFloat(req.query.q.longitude);
//       // getWeather.getWeather(logCities.getInitCity(cLat, cLon), (err, rslt) => {
//       //   if (err) {
//       //     console.log("weather error");
//       //   } else {
//       //     // STILL TODO: getting the day name according to the date
//       //     // let day = rslt.list[0].dt_txt.slice(0, rslt.list[0].dt_txt.indexOf(" "));
//       res.json("ERROR");
//     } else {
//       console.log("Current position is: ", rslt);
//       let cLat1 = parseFloat(rslt.latitude);
//       let cLon2 = parseFloat(rslt.longitude);
//       getWeather.getWeather(
//         logCities.getInitCity(cLat1, cLon2),
//         (err, rslt) => {
//           if (err) {
//             console.log("weather error");
//           } else {
//             // STILL TODO: getting the day name according to the date
//             // let day = rslt.list[0].dt_txt.slice(0, rslt.list[0].dt_txt.indexOf(" "));
//             res.json(rslt);
//           }
//         }
//       );
//     }
//   });
// });

app.get("/initial-weather", (req, res) => {
  console.log("/initial-weather request came in", req.query);
  // logCities.getCurPosIpGeo((err, rslt) => {
  //   if (err) {
  //     console.log(err);
  let cLat = parseFloat(req.query.q.latitude);
  let cLon = parseFloat(req.query.q.longitude);
  getWeather.getWeather(logCities.getInitCity(cLat, cLon), (err, rslt) => {
    if (err) {
      console.log("weather error");
    } else {
      // STILL TODO: getting the day name according to the date
      // let day = rslt.list[0].dt_txt.slice(0, rslt.list[0].dt_txt.indexOf(" "));
      res.json(rslt);
    }
  });
});

app.get("/weather", (req, res) => {
  console.log("/weather request came in", req.query);
  let cityName = req.query.q.slice(0, req.query.q.indexOf(","));
  let countryName = req.query.q.slice(req.query.q.indexOf(", ") + 1);
  console.log("city name", cityName);
  console.log("country name", countryName.trim());

  getWeather.getWeather(
    // });
    //   } else {
    //     console.log("Current position is: ", rslt);
    //     let cLat1 = parseFloat(rslt.latitude);
    //     let cLon2 = parseFloat(rslt.longitude);
    //     getWeather.getWeather(
    //       logCities.getInitCity(cLat1, cLon2),
    //       (err, rslt) => {
    //         if (err) {
    //           console.log("weather error");
    //         } else {
    //           // STILL TODO: getting the day name according to the date
    //           // let day = rslt.list[0].dt_txt.slice(0, rslt.list[0].dt_txt.indexOf(" "));
    //           res.json(rslt);
    //         }
    //       }
    //     );
    //   }
    logCities.getCityId(cityName.trim(), countryName.trim()),
    (err, rslt) => {
      if (err) {
        console.log("weather error", err);
      } else {
        // mainResult.cResult = logCities.getCityId(cityName.trim(), countryName.trim());
        mainResult = rslt;
        res.json(mainResult);
      }
    }
  );
});

// let elasticResult = searchCity.searchCity();
// console.log("elastic search result", elasticResult);

app.listen(process.env.PORT || port, () =>
  console.log("server is listening on port 8080")
);
