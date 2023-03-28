const axios = require("axios");

const initiatePayment = async (req, res) => {
  const { token, amount } = req.body;

  let data = {
    token: token,
    amount: amount,
  };

  let config = {
    headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` },
  };

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );
    if (response) {
      res.json({
        data: response,
        paid: true,
      });
    }
  } catch (error) {
  }

  const response = await axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
    })
    .catch((error) => {
    });
  res.send(response);
};

module.exports = { initiatePayment };
