const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  TWILIO_SERVICE_SID
} = process.env;

exports.handler = function(event, context, callback) {
  const { email: identity } = JSON.parse(event.body);

  const chatGrant = new ChatGrant({
    serviceSid: TWILIO_SERVICE_SID
  });

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  token.addGrant(chatGrant);
  token.identity = identity;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      token: token.toJwt()
    })
  });
};
