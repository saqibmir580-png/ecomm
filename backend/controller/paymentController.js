const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_ZirNx352chq7oN",
  key_secret: "vA583E9bd37CBhV6IQcZqITH",
});
const checkout = async (req, res) => {
  const option = {
    amount: 5000,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};
const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({ razorpayOrderId, razorpayPaymentId });
};
module.exports={
    checkout,paymentVerification
}