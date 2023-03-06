const axios = require('axios');

const initiatePayment = async (req, res) => {
    const {token, amount} = req.body;

    let data = {
        "token": token,
        "amount": amount,
      };

      console.log(data)
      
      let config = {
        headers: {'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`}
      };

      console.log(config)
      
      axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log(error);

        console.log("error was found")
      });
}

module.exports = {initiatePayment};