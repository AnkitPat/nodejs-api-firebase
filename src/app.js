const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/items', itemRoutes);
app.use('/authentication', userRoutes);

app.listen(port, () => {
    console.log('server is there')
})