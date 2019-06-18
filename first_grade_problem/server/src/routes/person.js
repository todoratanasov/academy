const express = require('express');
const router = express.Router();
//here we attach the routes to the router and export it so that it can be use by express (app in index.js in this case)
router.get('/person', (req,res)=>{
    res.send('You have request')
});
router.get('/person/:name', (req,res)=>{
    res.send(`Ye have requested this name: ${req.params.name}`)
});
router.get('/error', (req,res)=>{
    throw new Error('This is a forced error!')
})
module.exports = router;