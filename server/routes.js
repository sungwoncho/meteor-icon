function calcWidth(name) {
  return 250 + name.length * 6.305555555555555;
}

WebApp.connectHandlers.use("/package", function(request, response) {
  var url = `https://atmospherejs.com/a/packages/findByNames\
?names=${request.url.split('/')[1]}`;
  var opts = {headers: {'Accept': 'application/json'}};
  HTTP.get(url, opts, function(err, res) {
    var name = '', version, pubDate, starCount, installYear;
    var pl = res.data[0];

    if (res.data.length !== 0) {
      name = pl.name;
      version = pl.latestVersion.version;
      pubDate = moment(pl.latestVersion.published.$date).format('MMM Do YYYY');
      starCount = pl.starCount || 0;
      installYear = pl['installs-per-year'] || 0;
    }

    var width = calcWidth(name);
    var c = DDP.connect('https://atmospherejs.com/');
    var cl = new Meteor.Collection('scores', c);
    c.subscribe('package/dailyScores', request.url.split('/')[1], function(er, m) {
      var min = 100000, max = 0, scores= [width + "," + 80, "0,80"], i=0;
      cl.find().forEach(function(data){
        data.score > max ? (max = data.score) : (data.score < min ? min = data.score : min = min);
      });
      cl.find().forEach(function(data){
        scores.push((i++*(width/5)) + "," + ((30 - 30 * ((data.score-min) / (max-min))) + 23));
      });
      console.log(scores.length)

      SSR.compileTemplate('icon', Assets.getText('icon.svg'));

      var icon = SSR.render('icon', {w: width, totalW: width+2, n: name,
        v: version, p: pubDate, s: starCount, i: installYear, scores: scores,
        ls: (width - 20), lsv: Math.ceil(max)});

      response.writeHead(200, {"Content-Type": "image/svg+xml"});
      response.end(icon);
    });


  });
});
