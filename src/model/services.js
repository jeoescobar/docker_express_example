const mongoose = require('../database');

//module.exports = function(){
    var db = require('../libs/db-connection')();

    var Schema = require('mongoose').Schema;
    
    var services = new Schema({
        idp: Number,
        name: String,
        description: String,
        ip: String,
        port: String,
        ranking: Number

    });

    //return db.model('pract1',pract1);
module.exports = mongoose.model('services',services);
