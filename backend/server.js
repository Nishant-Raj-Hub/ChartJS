const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(
    console.log("Database connected successfully")
);

const DataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', DataSchema);


app.get('/create', async (req, res) => {
  console.log("Route working")
  const userData = new Data(req.body);
  await userData.save();
  res.status(201).send(userData).json({message: "data saved successfully"});
});


app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
