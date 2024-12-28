const express = require('express');
const app = express();
const port = 5000; // You can choose any port
const usersData=require('./data.json')
// const cors=require('cors');

// app.use(cors());

app.get('/api/users-data', (req, res) => {
  res.send(usersData);
});


app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});