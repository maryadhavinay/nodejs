var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(req,res){
    var book = new Book(req.body);
    
    console.log(book);
    res.send(book);
     
})
    .get(function(req,res){
        Book.find(function(err, books){
            if(err)
                console.log(err);
            else
                res.json(books);
        });
});

app.use('/api', bookRouter);


app.get(('/'),function(req,res){
    res.send('Welcome to API');
});

app.listen(port, function(){
    console.log('Gulp is running on port ' + port);
});