const connectToMongoose =require('./database/db');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const port =process.env.PORT||8000;
connectToMongoose();
app.use(express.json());
app.use('/api/user',require('./routes/user'));
app.use('/api/employee',require('./routes/employee'));
app.get('/', function (req, res) {
  res.write(`<h1>Connection Sucessfull</h1>`)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port} and http://localhost:${port}`)
})
