const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Category = require('../../models/Category');
const User = require('../../models/User');

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res)=>{

    Post.countDocuments({}).then(postCount=>{
        Comment.countDocuments({}).then(commentCount=>{
            Category.countDocuments({}).then(categoryCount=>{
                User.countDocuments({}).then(userCount=>{
        res.render('admin/index', {postCount: postCount, commentCount: commentCount, categoryCount: categoryCount, userCount: userCount});
            });
        });
    });
    }); 
});

router.post('/generate-fake-posts', (req, res)=>{
    for(let i = 0; i<req.body.amount; i++){

        let post = new Post();

        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
       
        post.body = faker.lorem.sentence();
        post.slug = faker.name.title();

        post.save(function(err){
            if (err) throw(err);
        });
    }
    res.redirect('/admin/posts');
})


module.exports = router;