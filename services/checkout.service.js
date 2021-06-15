import createStripe from "stripe-client";

const stripe = createStripe(
    "pk_test_51IgByRAt8ltTQpVYkb4IdtGhOFE8qZVpNVUul8EooJGycWnAMvhqLvwxIsym7JHFBzD4UZtgeew74DPYcZWCZuOX00LrnrXwsp"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });
