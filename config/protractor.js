// config/protractor.js

exports.config = {
	specs: ['../test/e2e/**/*.js'],
	onPrepare: function() {
		browser.get('http://localhost:3000');
		element(by.id('entrar')).click();
		browser.driver.findElement(by.id('login_field'))
			.sendKeys('marlondametto@gmail.com');
		browser.driver.findElement(by.id('password'))
			.sendKeys('m1n0kam0');
		browser.driver.findElement(by.name('commit'))
			.click();	
	}
};