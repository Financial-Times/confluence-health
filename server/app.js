const express = require('@financial-times/n-express');
const health = require('n-health');
const path = require('path');

const port = process.env.PORT || 3002;
const healthCheckDir = process.env.HEALTHCHECK_DIR || path.resolve(__dirname, './healthchecks')
const healthChecks = health(healthCheckDir).asArray();

const app = module.exports = express({
	systemCode: 'confluence',
	healthChecks: healthChecks,
	withBackendAuthentication: false,
	withServiceMetrics: false,
	healthChecksAppName: 'Confluence',
});

app.use((req, res, next) => {
	res.set('Cache-Control', res.FT_NO_CACHE);
	next();
});

app.get('/', (req, res) => {
	res.redirect('/__health');
});

app.get('/__gtg', (req, res) => {
	res.sendStatus(200).end();
});

module.exports = app;
module.exports.listen = app.listen(port);
