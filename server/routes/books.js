var express = require('express');
var bodyParser = require('body-parser');
process.env.NODE_ENV = 'test';
var urlencod = bodyParser.urlencoded({extend:false});
// const express = require('express');
var router = express.Router();
const knex = require('../db/knex');

router.get('/books', (req, res) => {
    //  var quesNum = req.param('quesNum');
   // var nnn = req.params.quesNum;

      //console.log(quesNum);
    //console.log(nnn);
      // knex.select('*').from('book_city')
      //     .whereIn('book_id',function(){
      //     this.select('id').from('book').whereRaw('title = ');
    var cities = knex.raw('select * from city where number in (select number from book where title =("Yoana\'s city")');
    console.log(cities);
    res.status(200).json({
        status: 'success',
        data: cities
    });

    });
    // .catch((err) => {
    //     res.status(500).json({
    //         status: 'error',
    //         data: err,
    //       });
    //   });
// router.route('/books/:quesNum')
// .get(function(req, res){
//           var quesNum = req.param('quesNum');
//           console.log(quesNum);
//           // knex.select('*').from('book_city')
//           //     .whereIn('book_id',function(){
//           //     this.select('id').from('book').whereRaw('title = ');
//           knex.raw('select * from users where id in (select id from book where title =(?)', [quesNum]);
//
//         })
//         .then((cities) => {
//             res.status(200).json({
//                 status: 'success',
//                 data: cities,
//               });
//           })
//         .catch((err) => {
//             res.status(500).json({
//                 status: 'error',
//                 data: err,
//               });
//           });

module.exports = router;
