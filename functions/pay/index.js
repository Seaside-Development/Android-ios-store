const res = require("express");
module.exports.payRequest = (request, response, stripeClient) => {
    const body = JSON.parse(request.body);
    const {token, amount} = body
    console.log(body)
    stripeClient.paymentIntents
        .create({
            amount,
            currency: 'USD',
            payment_method_type: ['card'],
            payment_method_data: {
                type: 'card',
                card: {
                    token,
                },
            },
            confirm: true,
        })
        .then((paymentIntents) => {
            response.json(paymentIntents)
            response.send("Successful Payment");
        })
        .catch((error) => {
            console.log(error)
            response.status(400)
            response.send(error)
        });
};
