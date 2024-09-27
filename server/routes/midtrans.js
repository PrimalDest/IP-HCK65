const express = require('express');
const bodyParser = require('body-parser');
const { Snap } = require('midtrans-client');

const router = express.Router();
router.use(bodyParser.json());

const midtransClient = new Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-TALAyYiiz6zRnOTvQca8zmOR',
  clientKey: 'SB-Mid-client-yj4CiX8LIQ-gElRT',
});

const generateRandomPhoneNumber = () => {
  const randomNumber =
    Math.floor(Math.random() * 9000000000) + 1000000000;
  return `08${randomNumber}`;
};

router.post('/create-transaction', async (req, res) => {
  try {
    const { grossAmount, itemName, userId, customerDetails } = req.body;

    const orderId = Math.random().toString()

    if (!orderId || !grossAmount || !itemName || !userId || !customerDetails) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const transactionDetails = {
      order_id: orderId,
      gross_amount: grossAmount,
    };

    const itemDetails = [{
      id: orderId,
      price: grossAmount,
      quantity: 1,
      name: itemName,
    }];

    const parameter = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: {
        user_id: userId,
        email: customerDetails.email,
        first_name: customerDetails.username,
        last_name: customerDetails.username,
        phone: customerDetails.phone || generateRandomPhoneNumber(),
      },
    };

    const transactionToken = await midtransClient.createTransaction(parameter);

    res.json({ token: transactionToken });
  } catch (error) {
    console.error('Failed to create Midtrans transaction', error);
    res.status(500).json({ error: 'Failed to create Midtrans transaction' });
  }
});

module.exports = router;
