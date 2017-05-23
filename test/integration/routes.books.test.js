process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

describe('routes : books', () => {
    beforeEach((done) => {
                knex.seed.run()
                .then(() => {
                    done();
                });
    });
});
