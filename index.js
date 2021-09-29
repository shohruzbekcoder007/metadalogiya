const mongoose = require('mongoose');
const express = require('express');
const adminRouter = require('./src/admin');

const app = express();
app.use(express.static('./static'));
app.set("view engine", "pug");

const port = process.env.PORT || 8000;


mongoose.connect('mongodb://localhost;27017/stat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...');
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
  });

const routers = require('./src/router');

app.use('/', routers);
app.use('/admin',  adminRouter);

app.listen(port, ()=> {
  console.log(`Application is up and running under localhost:${port}/admin`)
})
 