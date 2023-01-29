process.env.NODE_ENV = 'test';
const chai = require('chai');
const request = require('supertest');
const { app } = require('..');
const { TaskController } = require('../Controller/taskController');
const { Controller } = require('../Controller/Controller');
const { pool } = require('../db.config/db.config');
var expect = chai.expect;
TaskController(app);
Controller(app);

describe('Testing task controller API endpoint', function () {
  before(function () {
    request(app)
      .post('/todolist/')
      .send({
        id: 2,
        name: "Abcd",
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(201);
      })
  })
  it("Test Post Request", function (done) {
    request(app)
      .post('/todolist/task')
      .send({
        description: "Abcd",
        list_id: 2
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(201);
        done()
      })
  });

  it("Test Get Request", function (done) {

    request(app)
      .get('/todolist/task/1')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        done()
      })
  });

  it("Test toggle Request", function (done) {

    request(app)
      .get('/todolist/toggleTask/1')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done()
      })
  });

  it("Test Put Request", function (done) {
    request(app)
      .put('/todolist/task')
      .send({
        id: 1,
        description: "Test",
      })
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done()
      })
  });

  it("Test Delete Request", function (done) {
    request(app)
      .delete('/todolist/task/24')
      .end(function (err, res) {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Deleted successfully");
        done()
      })
  });
  after(function (done) { pool.query("drop table todotask"); done() });
});