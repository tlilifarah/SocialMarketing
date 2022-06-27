const express = require('express');
const router = express.Router();
const Product = require('../model/Product');


router.get('/', (req,res, next) =>{
    //get all profucts from dataase
    Product.find().select('_id name price').
    then(doc =>{
        res.status(200).json({
            products : doc
        })
    }).
    catch(err=>{
        res.status(404).json({
            massage: err
        })
    })
});

router.post('/addproduct',(req,res, next)=>{
    const product = new Product ({
        name: req.body.name,
        price : req.body.price
    })

    product.save().
    then(doc=>{
        res.status(200).json({
            massage:'added product'
        })
    }).
    catch(err=>{
        res.status(404).json({
            massage: err
        })
    })
})

router.get('/:productID', (req, res ,next) =>{
        Product.find({_id: req.params.productID}).
        then(resulat =>{
            res.status(200).json({
                product : resulat
            })
        }).
        catch(err=>{
            res.status(404).json({
                massage: err
            })
        })
})

router.patch('/:productID',(req,res , next )=>{

    const newproduct = {
        name: req.body.name ,
        price : req.body.price
    }
    Product.update({_id : req.params.productID} , {$set : newproduct}).
    then(doc=> {
        res.status(200).json({
            massage :doc
        })
    }).
    catch(err=>{
        res.status(404).json({
            massage: err
        })
    })
})

router.delete('/:productID',(req , res , next)=>{

    Product.deleteOne({_id : req.params.productID}).
    then(doc=> {
        res.status(200).json({
            massage : doc 
        })
    }).
    catch((err=>{
        res.status(404).json({
            massage: err
        })
    }))
})

module.exports= router ;