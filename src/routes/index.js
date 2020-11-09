const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const model = require('../model/services');

/*
router.use(express.json());
router.use(bodyParser.urlencoded())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
*/

//router.use(express.json());
//app.use(express.urlencoded({extended:true}));
//router.use(bodyParser.urlencoded({ extended: true}));
//router.use(bodyParser.json());
//


router.get('/',(req,res)=>{
    res.send('Hello world asda');

});



router.get('/servicios', async  (req, res) =>{
  let r = await model.find({}).exec();
  res.json(r);
  //res.json('Estas en servicios');
});


router.get('/servicio', async (req, res) =>{
  //let r = await model.find({}).limit(1).exec();
  let index = await model.count();
  let r = await model.find().skip(index - 1)
  res.json(r);
  //res.json('Estas en servicios');
});

router.post('/services/last', async  (req, res) => {
  //let r = await model.find({}).limit(1).exec();
  let num = req.body.number;
  let index = await model.count();
  let r;
  if(num > index){
    r = await model.find().exec();

  }else{
     r = await model.find().skip(index - num);
  }
  //index = index-num;
  
  res.json(r);
  //res.json('Estas en servicios');
});

router.get('/service/first', async  (req, res) =>{
  let r = await model.find({}).limit(1).exec();
  res.json(r);
  //res.json('Estas en servicios');
});


router.post('/service/create', async (req,res)=>{
    //console.log(new model(req.body));
    //res.send(req.body);
    //const task = new model(req.body);
    //let body = req.body;
    const serv =  new model(req.body);
    await serv.save();
    //res.send(task)
    //const data = req.body
  //console.log(data)
    //return res.json(data);
    res.status(201).send(serv);
  });

  router.post('/service/update', async (req,res)=>{
    
    var obj = new model();
    //let r = await model.find({"idp":2}).exec();
    let r = await model.find({idp:req.body.idp}, (err,doc)=>{
        if(doc.length == 1){
          obj = doc[0];
        }

    });
    //console.log(r);
    if(req.body.name != null){
      obj.name = req.body.name;

    }
    if(req.body.description != null){
      obj.description = req.body.description;

    }
    if(req.body.ip != null){
      obj.ip = req.body.ip;

    }
    if(req.body.port != null){
      obj.port = req.body.port;

    }
    if(req.body.ranking != null){
      obj.ranking = req.body.ranking;

    }

    await model.updateOne({idp:req.body.idp},{$set: {
      
        name: obj.name,
        description: obj.description,
        ip: obj.ip,
        port: obj.port,
        ranking: obj.ranking
    }});

    console.log(r);
    res.json(obj);
  
  });
  
  router.post('/service/delete', async (req,res)=>{
    await model.deleteOne({idp: req.body.idp});
    res.json({mensaje: "Eliminado correctamente"});
  });
  
  router.post('/service/retrieve_by_ip', async (req,res)=>{

    
    let r = await model.find({ip:req.body.ip}).exec();
    res.json(r);
  
  });

  router.post('/service/retrieve_by_ip_port', async (req,res)=>{

    
    let r = await model.find({ip:req.body.ip, port: req.body.port}).exec();
    res.json(r);
  
  });

  router.post('/service/retrieve_by_name', async (req,res)=>{

    
    let r = await model.find({name:req.body.name}).exec();
    res.json(r);
  
  });


module.exports = router