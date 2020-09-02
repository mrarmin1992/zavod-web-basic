const express = require('express');
const router = express.Router();
const faker = require('faker');
const Category = require('../../models/Category');

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{

    Category.find({}).then(categories=>{
        res.render('admin/categories/index', {categories: categories});
    });


   
});
router.post('/create', (req, res)=>{


      const newCategory = Category({

        name: req.body.name
      });
      newCategory.save().then(savedCategory=>{
        res.render('admin/categories');
      });
    
});



router.get('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).then(categories=>{


        res.render('admin/categories/edit', {categories: categories});
    });
   
});


router.put('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).then(categories=>{

categories.name = req.body.name;
categories.save().then(savedCategory=>{
    res.redirect('/admin/categories');
});
       
    });


   
});


router.delete('/:id', (req,res)=>{

    Category.remove({_id: req.params.id}).then(result=>{
        res.redirect('/admin/categories');
    });
});

module.exports = router;