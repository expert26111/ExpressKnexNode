
var express = require('express');
var app = express();
//var expressPromiseRouter = require("express-promise-router");
var router = express.Router();
//var router = expressPromiseRouter();
process.env.NODE_ENV = 'test';
var knex = require('./server/db/knex');
// Router middleware, mentioned it before defining routes.
var port = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/public'));

router.use(function(req,res,next) {
    console.log("/" + req.method);
    next();
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

router.use(allowCrossDomain);

router.use("/book/:id",function(req,res,next){
    console.log(req.params.id)
    if(req.params.id == 0) {
        res.json({"message" : "You must pass ID other than 0"});
    }
    else next();
});

// router.get("/",function(req,res){
//     res.json({"message" : "Hello World"});
// });

router.get("/book/:id",function(req,res){
   // var cities = knex.raw('select * from city where number in (select number from book where title =("Yoana\'s city")');
   // knex.raw('select * from book where book.number = '+req.params.id)
    knex('book').where('number', req.params.id).select()
    .then(book => {
        console.log(book);
        res.status(200).json({"book" : book});
    })
    .catch(error => {
       console.error('error: ',error);
    });
});

router.get("/books/:cityName",function(req,res){

    var subquery = knex('city').where({
        city: req.params.cityName
    }).select('number');

     knex.select('*').from('book')
    .whereIn('number', subquery)
    .then(books => {
        console.log("The books are " ,books);
        res.status(200).json({"books" : books});
    })
    .catch(error => {
        console.error('error: ',error);
        return  res.json({
            errors: ['Could not get books by city name']
        });
    });
});


router.get("/city/:bookTitle",function(req,res){
    var subquery = knex('book').where({
        title: req.params.bookTitle
    }).select('number');

     knex.select('*').from('city')
    .whereIn('number', subquery)
    .then(cities => {
         console.log("The cities are " ,cities);
        res.status(200).json({"cities" : cities});
    })
    .catch(error => {
        console.error('error: ',error);
       return res.json({
            errors: ['Could not get cities by book title']
    });
});
});

router.get("/allInfo/:author",function(req,res){

    knex('book').select(['book.title', 'city.city', 'city.lat', 'city.longt'])
    .innerJoin('city', 'city.number', 'book.number')
    .then(books => {

        //res.status(200).json({"cities" : cities});
        console.log("The books are ",books);
        res.status(200).json({"books" :  books});
    })
    .catch(error => {
        console.error('error: ',error);
        return res.json({
            errors: ['Could not get cities by book title']
        });
   });
});

// Handle 404 error.
// The last middleware.
// app.use("*",function(req,res){
//     res.status(404).send('404');
// });

// const router = express.Router();
// process.env.NODE_ENV = 'test';
// const knex = require('./server/db/knex');
// Define the port to run on
//app.use('/static', express.static(__dirname, '/public/index.html'));

//app.set('port', 5000);


//console.log(__dirname);
// Listen for requests
//////////////
// var books = require('./server/routes/books');
 //app.use('/books', books);
//////////////////
// app.get('/books/:quesNum', (req, res, next) => {
//     var quesNum = req.param('quesNum');
//     console.log(quesNum);
//     // knex.select('*').from('book_city')
//     //     .whereIn('book_id',function(){
//     //     this.select('id').from('book').whereRaw('title = ');
//     knex.raw('select * from users where id in (select id from book where title =(?)', [quesNum]);
//
//   })
// .then((cities) => {
//     res.status(200).json({
//         status: 'success',
//         data: cities,
//       });
//   })
// .catch((err) => {
//     res.status(500).json({
//         status: 'error',
//         data: err,
//       });
//   });
//});

app.use("/api",router);
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
//
// router.use(function(err, req, res, next) {
//         res.status(err.status || 500)
//         .json({
//             status: 'error',
//             message: err.message
//         });
//     });

router.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: err.status,
        message: err.message
    });
});


// var server = app.listen(app.get('port'), function () {
//     var port = server.address().port;
//     console.log('Magic happens on port ' + port);
//   });

var server = app.listen(port, function(){
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
  });