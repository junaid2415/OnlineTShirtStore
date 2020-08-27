const stripe = require('stripe')('sk_test_51Gzda5FKhwz6ZAhO7uejhVYNsTQb5YL94Gp8welzdtW097dWQXdwWCn8aESH9lfLZ2P4H9yhjoKe09UPVS3hv3y000A6JlXre2')
const uuid = require('uuid/v4')

exports.makepayment = (req, res) => {

    const {products, token} = req.body
    console.log("PRODUCTS", products);

    let amount =0;
    products.map(p =>{
        amount = amount + p.price
    });

    const idempotencyKey = uuid()


    return stripe.customers.create({
        description : "This is a test descriotoin",
        email : token.email,
        source : token.id
    }).then( customer => {
        stripe.charges.create({
            amount : amount,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log("here it is in backnde ",err))
    })

  };
  