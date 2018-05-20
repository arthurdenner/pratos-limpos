const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const schoolsController = require('./controllers/schools');

const port = process.env.PORT || 7777;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search-schools', schoolsController.getSchoolsByName);
app.post('/update-schools', schoolsController.updateSchools);

app.listen(port, () => console.log(`Listening on port ${port}...`));
