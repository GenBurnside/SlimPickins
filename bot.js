var irc = require('irc');
var request = require('request');

var client = new irc.Client(process.env.IRC_SERVER_HOST, 'YoMomma', {
  channels: ['#funhole']
});

client.addListener('message', function(from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('message', function(from, to, message) {
  switch (message) {
    case 'BTC':
      request("https://bitpay.com/api/rates/usd", function(err, response, body) {
        var res = JSON.parse(body);
        client.say('#funhole', '$' + res.rate);
      });
      break;
    case 'DOGE':
      client.say('#funhole', 'TO THE MOON!');
      break;
  }
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});
