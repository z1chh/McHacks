const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const app = express();
const config = require("./config");

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Sendgrid email server');
});

app.get('/send-email', (req, res) => {
    // Get variables from from query string 

    const { name, desc, date, address } = req.query;

    sgMail.setApiKey(config.APIKey);
    
    const msg = {
        to: "kimonorekt@gmail.com",
        from: "cleanbiteofficial@gmail.com",
        subject: "Health Code Violation Report",
        text: "Business Name: "+name+"\nBusiness Address: "+address+"\nReport Date: "+date+"\nReport Description: "+desc,
        html: "Business Name: "+name+"\n<br>Business Address: "+address+"\n<br>Report Date: "+date+"\n<br>Report Description: "+desc
    };

    sgMail.send(msg).then((res) => console.log("Response: "+res));

})

app.listen(4000, () => console.log("Running on port 4000"));

