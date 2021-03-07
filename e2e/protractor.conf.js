// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    debug: true,
    allScriptsTimeout: 60000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        chromeOptions: {
            args: [],
        },
        browserName: 'firefox'
    },
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        ScriptTimeoutError: 60000,  // ScriptTimeoutError is 30s by default
        defaultTimeoutInterval: 60000,
        print: function() {}
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: StacktraceOption.PRETTY
            }
        }));
    }
};
