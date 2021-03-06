const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router =require('./Router');

var cors = require('cors')
app.use(cors())

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
console.log('Testing server');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//database
const db= mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'root',
    password:'',
    database:'Nursing_Schedular'

});



db.connect(function(err){

    if(err){
        console.log('DB ERROr');
         throw err;

        return false;
    }
    else{
        console.log('Connected');
    }
});

const sessionStore= new MySQLStore({
    expiration:(1825 * 86400 * 1000),
    endConnectionOnClose: false
},db);

app.use(session({
    key: 'bkjgbhjdgfjs',
    secret:'sagjfguy4yret384',
    store: sessionStore,
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:(1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app,db);
app.options('*', cors()) 
// app.get('/',cors(corsOptions),function(req,res){
//     res.sendFile(path.join(__dirname,'build','index.html'));
// });
app.listen(3000);