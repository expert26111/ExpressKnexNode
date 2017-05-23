// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user:     'root',
        password: '',
        database: 'booksdb',
      },
    seeds: {
      directory: __dirname + '/server/db/seeds',
    }
  },
  // development: {
  //   client: 'mysql',
  //   connection:
  //     ' jdbc:mysql://localhost:3306/book_test',
  //
  //   seeds: {
  //     directory: __dirname + '/server/db/seeds',
  //   }
  // },
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

  // test: {
  //   client: 'mysql',
  //   connection:
  //   'jdbc:mysql://localhost:3306/booksdb',
  //
  // },
  // seeds: {
  //   directory: __dirname + '/server/db/seeds',
  // }
  //

  // test: {
  //    client: 'mysql',
  //    connection: {
  //      host : '127.0.0.1',
  //      user:     'root',
  //      password: '',
  //      database: 'book_test'
  //    },
  //   seeds: {
  //     directory: __dirname + '/server/db/seeds'
  //   }
  //  }


    test: {
        client: 'mysql',
        connection: {
            host : '188.226.149.201',
            user:     'root',
            password: 'root',
            database: 'books_test'
        },
        seeds: {
            directory: __dirname + '/server/db/seeds'
        },
        pool: {
            min: 0,
            max: 10
        }
    }


};


