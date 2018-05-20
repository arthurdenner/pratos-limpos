const request = require('request');
const csvtojson = require('csvtojson');
const normalizeSchools = require('../utils/normalize-schools');

const updateSchools = async (req, res) => {
  const csvURL = req.body.csv;
  let schools = [];

  csvtojson()
    .fromStream(request.get(csvURL))
    .on('json', json => {
      schools = schools.concat(json);
    })
    .on('done', err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      const normalized = normalizeSchools(schools);

      return res.status(200).send(normalized);
    });
};

module.exports = {
  updateSchools,
};
