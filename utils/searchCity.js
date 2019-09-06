const elasticlunr = require('elasticlunr');
const cities = require("../../city.list.json");

const index = elasticlunr(function () {
    this.addField('name');
});
index.addDoc(cities);

module.exports.searchCity = function searchCity(){
  let rslt = index.search("Vac");
  console.log(rslt);
  return rslt;
}
