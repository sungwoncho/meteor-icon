WebApp.connectHandlers.use("/package", function (request, response) {
  response.writeHead(200, {"Content-Type": "image/svg+xml"});
  SSR.compileTemplate('icon', Assets.getText('icon.svg'));

  var pkgName = request.url.split('/')[1];

  Meteor.call('getPackageParams', pkgName, function (err, res) {
    if (err) {
      console.log('error occurred');
      response.end(err);
    }

    Meteor.call('incrementPackageCounter', pkgName);

    var atmosphere = DDP.connect('https://atmospherejs.com/');
    var scoresCollection = new Meteor.Collection('scores', atmosphere);

    if (res.name) {
      atmosphere.subscribe('package/dailyScores', res.name, function(er, m) {
        var min = 100000,
            max = 0,
            scores= [res.width + "," + 80, "0,80"],
            i=0;

        scoresCollection.find().forEach(function(data){
          if (data.score > max) {
            max = Math.ceil(data.score);
          } else if (data.score < min) {
            min = data.score;
          } else {
            min = min;
          }
        });
        scoresCollection.find().forEach(function(data){
          scores.push((i++*(res.width/5)) + "," +
           ((30 - 30 * ((data.score-min) / (max-min))) + 23));
        });

        var stars;
        if (max > 4) {
          stars = "★★★★★";
        } else {
          stars = "★★★★★".substring(0, max) + "☆☆☆☆".substring(0, 5-max);
        }

        _.extend(res, {
          scores: scores, lsv: max, stars: stars
        });

        icon = SSR.render('icon', res);
        response.end(icon);
      });
    } else {
      icon = SSR.render('icon', res);
      response.end(icon);
    }
  });
});
