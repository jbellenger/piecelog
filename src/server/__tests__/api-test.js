import { assert } from 'chai';
import { middleware } from '../api';
import request from 'supertest';
import express from 'express';

suite('api', () => {
  const app = express().use(middleware);

  const formatQuery = (obj) => {
    return {query: JSON.stringify(obj)};
  };

  suite('/1/bootstrap', (done) => {
    test('should return {} by default', (done) => {
      request(app)
        .get('/1/bootstrap')
        .expect('Content-Type', /json/)
        .expect(200, {}, done);
    });

    test('should return log data when requested', (done) => {
      request(app)
        .get('/1/bootstrap')
        .query(formatQuery({db: {log: true}}))
        .expect('Content-Type', /json/)
        .expect((res) => assert.property(res.body.db, 'log'))
        .end(done);
    });

    test('should return pieces data when requested', (done) => {
      request(app)
        .get('/1/bootstrap')
        .query(formatQuery({db: {pieces: true}}))
        .expect('Content-Type', /json/)
        .expect((res) => assert.property(res.body.db, 'pieces'))
        .end(done);
    });

    test('should return people data when requested', (done) => {
      request(app)
        .get('/1/bootstrap')
        .query(formatQuery({db: {people: true}}))
        .expect('Content-Type', /json/)
        .expect((res) => assert.property(res.body.db, 'people'))
        .end(done);
    });
  });
});
