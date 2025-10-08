
const AmazonMail = require('../models/AmazonMail.model');

exports.saveEmail = async (req, res) => {
  const { subject, body } = req.body;

  if (!subject || !body) {
    return res.status(400).json({ error: 'Subject and body are required' });
  }

  try {
    const newEmail = new AmazonMail({ subject, body });
    await newEmail.save();
    res.status(201).json({ message: 'Email saved successfully', email: newEmail });
  } catch (error) {
    console.error('Error in saveEmail:', error);
    res.status(500).json({ error: error.message });
  }
};

