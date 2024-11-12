const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auctionPlatform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    try {
        await newContact.save();
        res.status(200).send('Message saved successfully');
    } catch (error) {
        res.status(500).send('An error occurred while saving the message');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post('/api/update-account', async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const userId = 'USER_ID'; 
        await User.findByIdAndUpdate(userId, { name, email, phone });

        res.status(200).send('Account information updated successfully');
    } catch (error) {
        res.status(500).send('An error occurred while updating the account information');
    }
});
