const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


/* App config */
const app = express();
const port = 8083;


/* AWS and DynamoDB config */
AWS.config.update({
    region: 'us-east-2',
    accessKeyId: '',
    secretAccessKey: ''
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();


/* Parse incoming JSON */
app.use(express.json());
app.use((req, res, next) => {
    /* Disable CORS for development */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
   
    /* Respond to CORS preflight request */
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendStatus(200);
    }
   
    next();
});


/**
 * Queries and returns data from DynamoDB table
 * Path: '/'
 * Request: GET
 */
app.get('/', (req, res) => {
    const params = {
        TableName: 'Gym2'
    };


    dynamoDB.scan(params, (err, data) => {
        if (err) { res.status(500).send('Error fetching data from DynamoDB: ' + JSON.stringify(err)); }
        else { res.send(data.Items); }
    });
});




/**
 * Inserts data into DynamoDB table
 * Path: '/'
 * Request: POST
 */
app.post('/', (req, res) => {
    const id = uuidv4();
    const date = new Date().toISOString().slice(0, 10);
   
    const body = {
        'id': id,
        'Name': req.body.name,
        'Date': date,
        'Lift': req.body.lift,
        'Weight (lbs)': req.body.weightLbs,
        'Weight (kg)': req.body.weightKg,
        'Reps': req.body.reps,
		'Combined': req.body.combined
    };
   
    const params = {
        TableName: 'Gym2',
        Item:body
    };
   
    dynamoDB.put(params, (err) => {
        if (err) { res.status(500).send('Error adding data to DynamoDB: ' + JSON.stringify(err)); }
        else { res.send('Data added successfully'); }
    });
});


/* Start app and begin listening for HTTP requests */
app.listen(port, () => {
    console.log(`
    *************************************************
      _    _  __ _     _____            _          
     | |  (_)/ _| |_  |_   _| _ __ _ __| |_____ _ _
     | |__| |  _|  _|   | || '_/ _\` / _| / / -_) '_|
     |____|_|_|  \\__|   |_||_| \\__,_\\__|_\\_\\___|_|  
                                               
    *************************************************
    `);
   
    console.log(`app listening on port ${port}`);
});

