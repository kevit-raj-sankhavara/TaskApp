const sgMail = require("@sendgrid/mail");

const APIkey = process.env.APIKEY;
console.log(APIkey);

sgMail.setApiKey(APIkey);

const sendWelcomeEmail = async (email, name) => {
    const res = await sgMail.send({
        to: email,
        from: "rdsankhavara2207@gmail.com",
        subject: "Welcome to our app",
        text: "Thanks for joining with us. Hows yout first experience with us"
    })
    console.log(res);
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