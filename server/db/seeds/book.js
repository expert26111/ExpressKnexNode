
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  //return (knex('book').del() && knex('book_city').del())
  return  Promise.all([
    // Inserts seed entries
    knex('book').del(),
    knex('city').del()
  ])
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('book').insert({number: 136,title: 'Yoana\'s adventures',author:'Yoana Dandarova'}),
        knex('book').insert({number: 206,title: 'Yoana\'s city',author:'Yoana Dandarova'}),
        knex('book').insert({number: 222,title: 'Yoana\'s place',author:'Yoana Dandarova'})
      ]).then(values =>{

        //console.log(values);
        return Promise.all([
        knex('city').insert({number:values[0],city: 'Plovdiv',lat:'42.15397605',longt:'24.7539823'}),
             knex('city').insert({number:values[1],city: 'Agana',lat:'13.4700163',longt:'144.750017'}),
             knex('city').insert({number:values[2],city: 'Erenhot',lat:'43.66155845',longt:'111.9654549'})
        ]);
      });
    });

  // return knex('book').del()
  // .then(function () {
  //   return Promise.all([
  //     // Inserts seed entries
  //     knex('book_city').insert({title: 'Yoana\'s adventures',author:'Yoana Dandarova'}),
  //     knex('book_city').insert({title: 'Yoana is using knex',author:'Yoana Dandarova'}),
  //     knex('book_city').insert({title: 'Yoana knows the best',author:'Yoana Dandarova'})
  //   ]);
  // });

};
