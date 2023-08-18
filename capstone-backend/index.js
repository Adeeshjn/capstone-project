var express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();


var app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/coupons', require('./routes/coupons'));


app.listen(port, () => {
    console.log('Server listening on port 5000...');
});