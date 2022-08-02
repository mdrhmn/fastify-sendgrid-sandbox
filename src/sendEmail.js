const fastify = require('fastify')()

fastify.register(require('fastify-sendgrid'), {
    apiKey: process.env.SENDGRID_API_KEY
})

fastify.get('/sendmail/:email', (req, reply, next) => {
    let { sendgrid } = fastify
    let recipient = req.params.email

    console.log("SENDING EMAIL")

    const msg = {
        // Send bulk emails, 'to' param = array e.g. [emailA, emailB]
        to: recipient,
        from: 'rahiman.abdulmanab@dell.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    //   //ES6F
    //   sendgrid
    //     .send(msg)
    //     .then(() => {}, error => {
    //       console.error(error);

    //       if (error.response) {
    //         console.error(error.response.body)
    //       }
    //     });
    //ES8
    (async () => {
        try {
            await sendgrid.send(msg);
            // Send bulk emails
            // await sendgrid.sendMultiple(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
    
    console.log("EMAIL SENT")
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})