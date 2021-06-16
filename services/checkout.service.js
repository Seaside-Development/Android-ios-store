import createStripe from "stripe-client";
const stripe = createStripe(
    "pk_test_51IgByRAt8ltTQpVYkb4IdtGhOFE8qZVpNVUul8EooJGycWnAMvhqLvwxIsym7JHFBzD4UZtgeew74DPYcZWCZuOX00LrnrXwsp"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
    return fetch(`http://localhost:3000`,
        {
            body: JSON.stringify({
                token,
                name,
                amount,
            }),
            method: 'POST',
        }).then(res => {
        if (res.status > 200) {
            return Promise.reject("something went wrong processing your payment");
        }
        return res.json();
    })
}
