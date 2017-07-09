var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'x',
    password: 'x',
    database: 'switch_stock'
});

connection.connect();

// Setup a route to handle React's first request
router.get('/getInventoryData', function(req, res, next) {
    connection.query('SELECT * FROM retailers', (error, results)=>{
        if (error) throw error;
        console.log(results);
        res.json(results);
    })
});

module.exports = router;
