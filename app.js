const express = require('express');
const oracledb = require('oracledb');
const connAttr = require('./dbconfig');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();
const port = 1337;

app.use(session({
    secret : 'JEON',
    resave : true,
    saveUninitialized : true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static('views'));
app.use(express.static(__dirname + '/views'));
app.use('/update_post', express.static('views'));//이렇게 하는게 맞나?
app.use('/post', express.static('views'));

app.use(expressLayouts);
app.set('layout', 'layout');
//app.set('layout extractScripts', true);
oracledb.autoCommit = true;
app.use(function(req, res, next){
    oracledb.getConnection(connAttr, function(err, conn){
        if(err){
            throw err;
            console.log(err.message);
        }else{
            req.conn = conn;
            next();
        }
    });
});


app.set('view engine', 'ejs');
app.use(require('./routes/router'));


app.listen(port, function(){
    console.log(`port : ${port}`);
});