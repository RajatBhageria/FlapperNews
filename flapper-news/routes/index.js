var mongoose = require('mongoose'); 

var express = require('express');
var router = express.Router();
var Post = mongoose.model('Post'); 
var Comment = mongoose.model('Comment'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//GET /posts -- get all posts 
router.get('/posts', function (req, res, next){
    Post.find(function(err, posts){
        if (err){
            return next(err); 
        }
        res.json(posts); 
    });
});

//POST /posts -- add new post 
router.post('/posts', function (req, res, next){
    var post = new Post(req.body); 
    
    post.save(function(err, post){
        if (err) {return next(err);}
        res.json(post);
    });
});

//Router to get individual id 
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('cant find post')); }

    req.post = post;
    return next();
  });
});


//GET /posts/id--get an individual post 
router.get('/posts/:post', function(req, res, next){
    req.post.populate('comments', function(err, post){
        if (err) {return next(err);}
    });
    res.json(req.post); 
});

//PUT /posts/id/upvote--ad an upvote to an individual post
router.put ('/posts/:post/upvote', function (req, res, next){
    req.post.upvote(function(err, post){
        if (err) {return next(err);}
        res.json(post);
    });
    
});

//POST /posts/id/comments -- add a comment
router.post('/posts/:post/comments', function(req, res, next){
    var comment = new Comment (req.body); 
    comment.post = req.post; 
    
    comment.save(err, comment){
        if (err){return next(err);}
        req.post.comments.push(comment); 
        req.post.save(function(err, post){
            if (err) {return next(err);}
            res.json(comment); 
        });
    });
});

//Router to get individual comment
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('cant find comment')); }

    req.body = post;
    return next();
  });
});

//PUT /posts/id/comments/upvote--ad an upvote to an individual comment 
router.put ('/posts/:post/comments/:comment/upvote', function (req, res, next){
    req.post.upvote(function(err, post){
        if (err) {return next(err);}
        res.json(post);
    });
    
});

module.exports = router;
