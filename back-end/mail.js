/* eslint no-console: 0 */

'use strict';

const bunyan = require('bunyan');
const nodemailer = require('nodemailer');



// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'writersAppTeam@gmail.com',
        pass:  ""
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Hello <hello@digitalcrafts.com>'
});

console.log('SMTP Configured');

// Message object
let message = {
    // Comma separated list of recipients
    to: 'Robert Bunch <robertbunch@hotmail.com>',
    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔ #', //
    // plaintext body in case an old email client
    text: 'Hello to myself!',
    // HTML body
    html: '<p><b>Hello</b> to myself.</p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/>Image would be here</p>',
    // Apple Watch specific HTML body
    watchHtml: '<b>Hello</b> to myself',

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
