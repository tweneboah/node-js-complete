const express = require('express');
require('./config/dbConnect')();
const request = require('request');
const Donotion = require('./models/Donotion');
const app = express();

app.use(express.json());

//1. Initialize payment
app.post('/paystack/pay', (req, res) => {
  console.log(req.body);
  //Options for request

  //body
  //This is the required field by paystack
  const formData = {
    email: req.body.email,
    amount: req.body.amount * 100,
  };
  //Adding additional fields
  formData.metadata = {
    fullName: req.body.fullName,
  };
  const options = {
    url: 'https://api.paystack.co/transaction/initialize',
    form: formData,
    headers: {
      authorization: 'Bearer sk_test_e4408b13c8036a7ce6ffd28ec8d02b3145db2f2d',
    },
  };
  //Make the request
  request.post(options, function (err, response, body) {
    if (err) {
      console.log(err);
    } else {
      //The body contains the url created for payment and the reference
      //convert it from json to object
      const responseData = JSON.parse(body);
      const { authorization_url } = responseData.data; //you copy and paste this authorization_url  into the browswer and it will open a form for you
      console.log(authorization_url);
      //We have to redirect the user to the url created
      res.send(authorization_url); //This will open a page on in the browser automatically
      //After redirect is successfull paystack will send use the details about the transaction to us through the callback we set inside our paystack dashboard
      //
    }
  });
});

//2. Verify Payment
//We need the reference automatically after initialization and it can be access as req.query.reference
app.get('/paystack/callback', (req, res) => {
  //Make request to paystack to get the transaction details f
  const userReferenceFromInitializePayment = req.query.reference;
  const options = {
    url:
      'https://api.paystack.co/transaction/verify/' +
      encodeURIComponent(userReferenceFromInitializePayment),
    headers: {
      authorization: 'Bearer sk_test_e4408b13c8036a7ce6ffd28ec8d02b3145db2f2d',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
  };

  request.get(options, async (err, response, body) => {
    if (err) {
      console.log('Error occured', err);
    } else {
      //Convert the response
      const resData = JSON.parse(body);
      //destructure and save important details you want base on your model
      console.log('resData.data', resData.data);
      //Divide the amount by 100 to get the actual amount paying;
      const amount = resData.data.amount / 100;
      const { reference } = resData.data;
      //get full name
      const { fullName } = resData.data.metadata;

      //Save this to the database
      const newDonation = new Donotion({ amount, reference, fullName });

      await newDonation.save();
      //We want to print a receipt like emma paid GHS 400 to Teklinco so we will redirect and create a route for that
      res.redirect(`/receipt/${newDonation._id}`);
      //res.send(newDonation);
    }
  });
});

//We need to print receipt to the user like emma you paid 700GHS to Teklinco
app.get('/receipt/:id', async (req, res) => {
  try {
    //Get the id of the user
    const userId = req.params.id;
    //Find the user in the database
    const user = await Donotion.findById(userId);
    //Redirect to UI
    //   res.redirect('/receipt')

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log('Server is runing');
});
