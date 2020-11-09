const mongoose = require('mongoose');

let db = mongoose.createConnection('mongodb://db:27017/pract1');


module.exports = function connection(){
    if(!db){
        mongoose.connect("mongodb://db:27017/pract1");

    }
    return db;
}