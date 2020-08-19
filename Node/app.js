const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
// const bodyParser = require('body-parser');
const app = express();

// app.use(express.json());

// connecting to mongodb
// const mongouri = require('./config/keys.js').mongoURI;
// mongoose.connect(mongouri)
//     .then( () => console.log('Connected to MongoDB'))
//     .catch( err => console.log('Error while connecting to MongoDB', err));

// Homepage route
app.get('/',(req,res) => {
   res.sendFile(path.join(__dirname+'/static/index.html'));
});

// use routes
// const items = require('./routes/api/items.js');
// app.use('/api/items' , items);

port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server started at port ${port}`));