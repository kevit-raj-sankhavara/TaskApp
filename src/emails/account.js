const sgMail = require("@sendgrid/mail");

const APIkey = "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"

sgMail.setApiKey(APIkey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "rdsankhavara2207@gmail.com",
        subject: "Welcome to our app",
        text: "Thanks for joining with us. Hows yout first experience with us"
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "rdsankhavara2207@gmail.com",
        subject: "Sorry to see you go !!",
        text: "Thanks for using our app and we'll meet soon.Please tell us why are you leaving our sevices !"
    })
}

module.exports = { sendWelcomeEmail, sendCancellationEmail }