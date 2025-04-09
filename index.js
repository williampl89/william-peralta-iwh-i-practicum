const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config()

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;



// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {

    const patients_url_object = 'https://api.hubspot.com/crm/v3/objects/patients?properties=name,address_patient,gender';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(patients_url_object, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Patients | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }

});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj', (req, res) => {
    try {
        res.render('update-cobj', { title: 'Create new Patient | HubSpot APIs' });      
    } catch (error) {
        console.error(error);
    }

});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

app.post('/update-cobj', async (req, res) => {
    const create_patients = {
        properties: {
            "name": req.body.name,
            "address_patient": req.body.address,
            "gender": req.body.gender
        }
    }

    const createPatient = 'https://api.hubspot.com/crm/v3/objects/patients';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(createPatient, create_patients, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));