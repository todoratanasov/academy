const CustomerModel = require('../models/customer.models');
const express = require('express');
const router = express.Router();

//this way we directly create a POST req to the database from this route
router.post('/customer', (req,res)=>{
//check if req.body exists and we send a 400 status code if it dose not
    if(!req.body){
        return res.status(400).send("Request body is missing")
    }
//we take what is in the request body and pass it directly to the model
    const model=new CustomerModel(req.body);
//we save the data in the database
    model.save()
        .then(doc=>{
            if(!doc||doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});
//this way we retreive entries from DB
router.get('/customer', (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }
    CustomerModel.findOne({
        email:req.query.email
    })
    .then(doc=>{
        //this way we send the returned from the DB as an json
        res.json(doc)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});

//this way we update an entry in the DB
router.put("/customer", (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndUpdate({
        email: req.query.email
    },req.body, {
        //this is an optional and we say to return the updated info
        new: true
    })
    .then(doc=>{
        res.json(doc)
    })
    .catch(err=>{
        res.status(500).json(err);
    })
});

//this way we delete an entry in the DB
router.delete("/customer", (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc=>{
        res.json(doc)
    })
    .catch(err=>{
        res.status(500).json(err);
    })
});

module.exports = router;