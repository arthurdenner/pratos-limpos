const request = require('request');
const csvtojson = require('csvtojson');
const firebase = require('../config/firebase');
const filterNewSchools = require('../utils/filter-schools');
const normalizeSchools = require('../utils/normalize-schools');

const getSchoolsByName = async (req, res) => {
  const queryParams = req.query;

  if (!queryParams.name) {
    return res.status(406).send({
      message: 'Pesquise por um nome!',
    });
  }

  const schoolsRef = firebase
    .database()
    .ref('/schools')
    .orderByChild('name');
  const schoolsSnapshot = (await (await schoolsRef.once('value')).val()) || {};
  const currentSchools = Object.values(schoolsSnapshot);

  const filtered = currentSchools.filter(school =>
    school.name.toLowerCase().includes(queryParams.name)
  );

  return res.status(200).send(filtered);
};

const updateSchools = async (req, res) => {
  const csvURL = req.body.csv;
  let schools = [];

  const schoolsRef = firebase.database().ref('/schools');
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
      const newSchools = filterNewSchools(normalized, currentSchools);

      const newSchoolsObject = newSchools.reduce((acc, school) => {
        const key = schoolsRef.push().key;

        return {
          ...acc,
          [`/${key}`]: {
            ...school,
            _id: key,
          },
        };
      }, {});

      schoolsRef.update(newSchoolsObject);

      return res.status(200).send(Object.values(newSchoolsObject));
    });
};

module.exports = {
  getSchoolsByName,
  updateSchools,
};
