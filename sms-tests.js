// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by sms.js.
import sms from "meteor/evolvier:sms";

// Write your tests here!
// Here is an example.
Tinytest.add('sms - example', function (test) {
  test.equal(sms, "sms");
});
