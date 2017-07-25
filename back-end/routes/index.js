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

'use strict';

const bunyan = require('bunyan');
const nodemailer = require('nodemailer');


function sendAlert(alert, recipient){

    'use strict';



// Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `${config.emailAddress}`,
            pass:  `${config.emailPassword}`
        },
        logger: bunyan.createLogger({
            name: 'nodemailer'
        }),
        debug: true // include SMTP traffic in the logs
    }, {
        // default message fields

        // sender info
        from: `${config.emailAddress}`
    });

    console.log('SMTP Configured');

    let message = {
        // Comma separated list of recipients
        to: `${recipient}`,
        // Subject of the message
        subject: 'Nintendo Switch Stock Alert', //
        // plaintext body in case an old email client
        text: `${alert}`,
        // HTML body
        html: `<p>${alert}</p>`,
        // Apple Watch specific HTML body
        watchHtml: '',

        // An array of attachments
        attachments: [


        ]
    };

    console.log('Sending Mail');
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
}


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

    var action = req.body.action;

    console.log(email, action);



    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +';', (error, results)=>{
        if (error) {
            throw error;
        }else if(results[0] !== undefined){
            if(action === 'new'){
                if(results[0].status === 'Active'){
                    res.json(results)
                }else{
                    connection.query('UPDATE users SET status = "Active" WHERE email='+`"${email}"` + ';', (err1, res1)=>{
                        if (err1) throw err1;
                        connection.query('SELECT * FROM users WHERE email=' +`"${email}"` + ';', (err2, res2)=>{
                            if (err2) throw err2;
                            console.log(res2);
                            res.json(res2);
                        })
                    })
                }
            }else if(action === 'delete'){
                connection.query('UPDATE users SET status = "Inactive" WHERE email='+`"${email}"` + ';', (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` + ';', (err2, res2)=>{
                        if (err2) throw err2;
                        res.json(res2);
                    })
                })
            }
        }else{
            if(action === 'new'){
                connection.query('INSERT INTO users (email, status) VALUES (?, ?)', [email, 'Active'], (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` + ';', (err2, res2)=>{
                        if (err2) throw err2;
                        res.json(res2);
                    })
                })
            }else{
                connection.query('INSERT INTO users (email, status) VALUES (?, ?)', [email, 'Inactive'], (err1, res1)=>{
                    if (err1) throw err1;
                    connection.query('SELECT * FROM users WHERE email=' +`"${email}"` +';', (err2, res2)=>{
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
    var alert;


    if(inStock === 'true'){
        stockUpdate = 1;
        alert = `As of the time of this email, the Switch was reported as in stock at the following url: ${url}`
    }else{
        stockUpdate = 0;
        alert = `As of the time of this email, the Switch was reported as out of stock at the following url: ${url}`
    }
    // console.log(url);
    // console.log(readSuccess);
    // console.log(stockUpdate);



    var changeQuery = `SELECT in_stock FROM retailers WHERE link='${url}'`;
    var emailQuery = `SELECT email FROM users WHERE status='Active'`;

    connection.query(changeQuery, (err, res)=>{
        if(err) throw err;
        if(res[0].in_stock === stockUpdate){
        }else{
            console.log(alert);
            connection.query(emailQuery, (err2, res2)=>{
                if(err2) throw err2;
                console.log(res2);
                for(let i = 0; i < res2.length; i++){
                    sendAlert(alert, res2[i].email)
                }

            })
        }
    });

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
