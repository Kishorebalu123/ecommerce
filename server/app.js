const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
//const orders = require('./routes/orders');



const cors = require('cors');

require('dotenv').config()

const {port,db_user,db_password}=process.env
const url=`mongodb+srv://${db_user}:${db_password}@cluster0.xtobcfn.mongodb.net/ecommerce`
const Port =port||5000
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
// app.use('/orders', orders);


// Connect to MongoDB

mongoose.connect(url)
.then(()=>{
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is running on port ${Port}`);
  });
})
.catch((error)=>{
  console.log(error.message)
  process.exit(1) // To exit the process if an error occurs
})



