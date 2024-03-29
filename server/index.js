const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;
var cors = require('cors')

const app = express();
app.use(cors());

// Body Parser?
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/openai',require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server Started on ${port}`));