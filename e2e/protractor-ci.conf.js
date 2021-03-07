
const config = require('./protractor.conf').config;

config.capabilities = {
	browserName: 'firefox',
	chromeOptions: {
		args: ['--headless']
	}
};

exports.config = config;
