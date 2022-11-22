const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")

// const view_routers = require('./routers/view_routers')
const user_router = require('./routers/user.router')
const management = require('./routers/management.router')
const task = require('./routers/task.router')
const group = require('./routers/group.router')
const file = require('./routers/file.router')
const log = require('./routers/log.router')

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('MY SECRET'));
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static('./static'));
app.set("view engine", "pug");

mongoose.connect('mongodb://localhost:27017/metadalogiya')
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...');
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
  });

app.use('/user', user_router)
app.use('/management', management)
app.use('/task', task)
app.use('/group', group)
app.use('/file', file)
app.use('/log', log)

app.get("/", (req,res) => {
  return res.render('login', {})
});

app.listen(port, ()=> {
  console.log(`Application is up and running under localhost:${port}`)
})