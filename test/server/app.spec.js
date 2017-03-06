const request = require('supertest');

describe('Confluence Health', () => {

	let app;

	before(() => {
		app = require('../../server/app');
	});

	it('should respond to a healthcheck request with current status', done => {
		request(app)
			.get('/__health')
			.expect(200, done);
	});

});
