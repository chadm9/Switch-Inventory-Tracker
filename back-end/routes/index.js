var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
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



    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (error, results)=>{
        if (error) {
            throw error;
        }else if(results[0] !== undefined){
            if(action === 'new'){
                if(results[0].status === 'Active'){
                    res.json(results)
                }else{
                    connection.query('UPDATE users SET status = "Pending" WHERE email='+`"${email}"` + 'AND phone=' + `"${phoneNumber}"`+';', (err1, res1)=>{
                        if (err1) throw err1;
                        connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (err2, res2)=>{
                            if (err2) throw err2;
                            console.log(res2)
                            res.json(res2);
                        })
                    })
                }
            }else if(action === 'check'){
                console.log(results[0]);
                res.json(results);
            }else if(action === 'delete'){
                connection.query('UPDATE users SET status = "Inactive" WHERE email='+`"${email}"` + 'AND phone=' + `"${phoneNumber}"`+';', (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (err2, res2)=>{
                        if (err2) throw err2;
                        res.json(res2);
                    })
                })
            }
        }else{
            if(action === 'new'){
                connection.query('INSERT INTO users (email, phone, status) VALUES (?, ?, ?)', [email,phoneNumber, 'Pending'], (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (err2, res2)=>{
                        if (err2) throw err2;
                        res.json(res2);
                    })
                })
            }else{
                connection.query('INSERT INTO users (email, phone, status) VALUES (?, ?, ?)', [email,phoneNumber, 'Inactive'], (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +' AND phone=' +`"${phoneNumber}"`+';', (err2, res2)=>{
                        if (err2) throw err2;
                        res.json(res2);
                    })
                })
            }
        }
    })




    // res.json({msg:"test"})
});


router.post('/updateInventoryData', function(req, res) {
    console.log(req.body);

    var url = req.body.url;
    var readSuccess = req.body.readSuccess;
    var inStock = req.body.inStock;
    var stockUpdate;


    if(inStock === 'true'){
        stockUpdate = 1;
    }else{
        stockUpdate = 0;
    }
    console.log(url);
    console.log(readSuccess);
    console.log(stockUpdate);

    var updateQuery = `UPDATE retailers SET in_stock=${stockUpdate}, updated = NOW() WHERE link='${url}';`;
    connection.query(updateQuery, (error, results)=>{
        if(error) throw error;
        console.log(results)

    });

    res.json('hello')
    // connection.query('SELECT * FROM retailers', (error, results)=>{
    //     if (error) throw error;
    //     console.log(results);
    //     res.json(results);
    // })
});

module.exports = router;
