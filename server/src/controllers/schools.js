const request = require('request');
const csvtojson = require('csvtojson');
const firebase = require('../config/firebase');
const filterSchools = require('../utils/filter-schools');
const normalizeSchools = require('../utils/normalize-schools');

const updateSchools = async (req, res) => {
  const csvURL = req.body.csv;
  let schools = [];

  const schoolsRef = await firebase.database().ref('/schools');
  const schoolsSnapshot = (await (await schoolsRef.once('value')).val()) || {};
  const currentSchools = Object.values(schoolsSnapshot);

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
      const newSchools = filterSchools(normalized, currentSchools);

      const newSchoolsRefs = newSchools.map(s => schoolsRef.push(s));

      return res.status(200).send(newSchoolsRefs);
    });
};

module.exports = {
  updateSchools,
};
