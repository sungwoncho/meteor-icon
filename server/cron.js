// Avoid being shut down due to inactivity on *.meteor.com host
// Make HTTP request to itself every 14 minutes
Meteor.setInterval(function () {
  HTTP.get(Meteor.absoluteUrl(), function (err, res) {
    console.log('Made HTTP call to itself');
  });
}, 840000);
