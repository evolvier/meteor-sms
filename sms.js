// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See sms-tests.js for an example of importing.
class sms {
  config(params) {
		if (params && params.providers && params.providers.length) {
			if (params.providers.find(item => item === "AWS")) {
				if (params && params.aws) {
					this.awsAccessKey = params.aws.accessKeyId;
					this.awsSecretKey = params.aws.secretAccessKey;
					this.awsRegion = params.aws.region;
					if (this.awsAccessKey && this.awsSecretKey && this.awsRegion) {
						if (this.awsAccessKey) process.env.AWS_ACCESS_KEY_ID = this.awsAccessKey;
						if (this.awsSecretKey) process.env.AWS_SECRET_ACCESS_KEY = this.awsSecretKey;
					}
					else {
							throw new Meteor.Error(404, 'Please add your AWS access key id & secret access key');
					}
				} else {
					this.awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
					this.awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
					this.awsRegion = process.env.AWS_REGION;
					let awsAccessKey = Meteor.settings.private.aws.accessKeyId;
					let awsSecretKey = Meteor.settings.private.aws.secretAccessKey;
					let awsRegion = Meteor.settings.private.aws.region;
					if (awsAccessKey && awsSecretKey && awsRegion) {
						if (awsAccessKey) process.env.AWS_ACCESS_KEY_ID = awsAccessKey;
						if (awsSecretKey) process.env.AWS_SECRET_ACCESS_KEY = awsSecretKey;
						this.awsAccessKey = awsAccessKey;
						this.awsSecretKey = awsSecretKey;
						this.awsRegion = awsRegion;
					}
					else {
							throw new Meteor.Error(404, 'Please add your AWS access key id & secret access key');
					}
				}
			}
		} else {
			throw new Meteor.Error(404, 'No provider');
		}
	}

	send (provider, number, message) {
		switch(provider) {
			case "AWS":
				return this.sendByAws(number, message)
			default:
				return Promise.reject("Provider not supported");
		}
	}

	sendByAws (number, message) {
		return new Promise((resolve, reject) => { // eslint-disable-line no-undef
			const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
			// Set the parameters
			const params = {
				Message: message /* required */,
				PhoneNumber: number, //PHONE_NUMBER, in the E.164 phone number structure
			};

			// Create SNS service object
			const sns = new SNSClient({ region: this.awsRegion });

			const run = async () => {
				try {
					const data = await sns.send(new PublishCommand(params));
					resolve("Success, message published. MessageID is " + data.MessageId)
				} catch (err) {
					reject(err);
				}
			};
			run();

		})
	}
}

export default new sms();
