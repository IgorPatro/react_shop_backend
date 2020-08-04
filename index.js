const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`It is working!`);
});

app.listen(process.env.PORT || 8080, () => console.log('Server is running on localhost:8080'));