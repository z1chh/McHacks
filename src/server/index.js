const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Sendgrid email server');
});

app.get('/send-email', (req, res) => {
    // Get variables from from query string 

    const { name, text } = req.query;

    sgMail.setApiKey("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");

    const msg = {
        to: "adam.hochschild2001@gmail.com",
        from: "cleanbiteofficial@gmail.com",
        subject: "HELLO WORLD",
        text: text,
    };
    sgMail.send(msg).then((msg) => console.log(text));

})

app.listen(4000, () => console.log("Running on port 4000"));

