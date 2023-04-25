// const Nexmo = require('nexmo');
import Nexmo from "nexmo";
const nexmo = new Nexmo({
  apiKey: 'e2d254e2',
  apiSecret: 'kfMNB54UixRqgx2y'
});

const from = 'NEXMO';
const to = '9009342733';
const text = 'Hello from Nexmo!';

nexmo.message.sendSms(from, to, text, (err, responseData) => {
  if (err) {
    console.log(err);
  } else {
    console.dir(responseData);
  }
});
