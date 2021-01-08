Package.describe({
  name: 'evolvier:sms',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'send sms',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/evolvier/meteor-sms.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "@aws-sdk/client-sns": "3.1.0"
});

Package.onUse(function(api) {
  api.versionsFrom('1.12.1');
  api.use('ecmascript');
  api.mainModule('sms.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('evolvier:sms');
  api.mainModule('sms-tests.js');
});
