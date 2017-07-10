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

router.post('/manageAlerts', (req,res)=>{
    var email = req.body.emailAddress;
    var phoneNumber = req.body.phoneNumber;
    var action = req.body.action;

    console.log(email, phoneNumber, action);

    if(action === 'new'){
        connection.query('INSERT INTO users (email, phone) VALUES (?, ?)', [email,phoneNumber], (error, results)=>{
            if (error) throw error;
            connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (error2, results2)=>{
                if (error2) throw error2;
                res.json(results2);
            })
        })
    }else if(action === 'check'){
        connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (error, results)=>{
            if (error) throw error;
            res.json(results);
        })
    }else if(action === 'delete'){
        connection.query('UPDATE users SET status = "Inactive" WHERE email='+`"${email}"` + 'AND phone=' + `"${phoneNumber}"`+';', (error, results)=>{
            if (error) throw error;
            connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (error2, results2)=>{
                if (error2) throw error2;
                res.json(results2);
            })
        })
    }


    // res.json({msg:"test"})
});

module.exports = router;
