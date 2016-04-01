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

    test('should return piece data when requested', (done) => {
      request(app)
        .get('/1/bootstrap')
        .query(formatQuery({db: {piece: true}}))
        .expect('Content-Type', /json/)
        .expect((res) => assert.property(res.body.db, 'piece'))
        .end(done);
    });

    test('should return person data when requested', (done) => {
      request(app)
        .get('/1/bootstrap')
        .query(formatQuery({db: {person: true}}))
        .expect('Content-Type', /json/)
        .expect((res) => assert.property(res.body.db, 'person'))
        .end(done);
    });
  });
});
