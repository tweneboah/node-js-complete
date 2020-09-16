const paystack = request => {
  const MySecretKey = 'sk_test_115607e95b49db1b3454b1664eb8d5c6975481c6';

  const initializePayment = (form, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  // Verify
  const verifyPayment = (ref, mycallback) => {
    const options = {
      url:
        'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(options, callback);
  };

  return { initializePayment, verifyPayment };
};

module.exports = paystack;
