process.env.NODE_ENV = 'test';
const chai = require('chai');
const request = require('supertest');
const { app } = require('..');
const { Controller } = require('../Controller/Controller');
const { pool } = require('../db.config/db.config');
var expect = chai.expect;
Controller(app);

describe('Testing list controller API endpoint', function () {
  before(async () => {
    await pool.query("delete from todolists");
    await pool.query("Create table todotask(todo_id int generated always as identity,list_id int,description varchar(200) not null,status varchar(50),Primary key(todo_id),Constraint fk_list Foreign key(list_id) References todolists(id))")
  });
  it("Test Post Request", function (done) {
    request(app)
      .post('/todo/')
      .send({
        id: 1,
        name: "Abcd",
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(201);
        done()
      })
  });

  it("Test Get all list Request", function (done) {

    request(app)
      .get('/todo/allList')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        done()
      })
  });

  it("Test Get list by id Request", function (done) {

    request(app)
      .get('/todo/1')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done()
      })
  });

  it("Test Delete list Request", function (done) {
    request(app)
      .delete('/todo/1')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Task deleted successfully");
        done()
      })
  });

});





