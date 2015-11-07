// 6.30555 is an average width of alphanumeric characters in this fontSize
function getWidth(name) {
  return 225 + name.length * 6.305555555555555;
}

WebApp.connectHandlers.use("/package", function (request, response) {
  response.writeHead(200, {"Content-Type": "image/svg+xml"});
  SSR.compileTemplate('icon', Assets.getText('icon.svg'));

  var pkgName = request._parsedUrl.pathname.split('/')[2];
  var url = `https://atmospherejs.com/a/packages/findByNames\?names=${pkgName}`;
  var opts = {headers: {'Accept': 'application/json'}};

  HTTP.get(url, opts, function(err, res) {
    var name = '';
    var pkg = res.data[0];
    var version, pubDate, starCount, installCount, icon;

    if (res.data.length !== 0) {
      name = pkg.name;
      version = pkg.latestVersion.version;
      pubDate = moment(pkg.latestVersion.published.$date).format('MMM Do YYYY');
      starCount = pkg.starCount || 0;
      installCount = pkg['installs-per-year'] || 0;
    }

    var width = getWidth(name);
    var params = {width: width, totalWidth: width+2, name: name,
                  version: version, pubDate: pubDate, starCount: starCount,
                  installCount: installCount, logoOffset: (width - 75)};

    var atmosphere = DDP.connect('https://atmospherejs.com/');
    var scoresCollection = new Meteor.Collection('scores', atmosphere);

    if (name) {
      atmosphere.subscribe('package/dailyScores', name, function(er, m) {
        if (request.query.scores === 'true') {
          var min = 100000,
              max = 0,
              scores= [width + "," + 80, "0,80"],
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
            scores.push((i++*(width/5)) + "," +
             ((30 - 30 * ((data.score-min) / (max-min))) + 23));
          });

          var stars;
          if (max > 4) {
            stars = "★★★★★";
          } else {
            stars = "★★★★★".substring(0, max) + "☆☆☆☆".substring(0, 5-max);
          }

          _.extend(params, {
            scores: scores, lsv: max, stars: stars
          });
        }

        icon = SSR.render('icon', params);
        response.end(icon);
      });
    } else {
      icon = SSR.render('icon', params);
      response.end(icon);
    }
  });
});
