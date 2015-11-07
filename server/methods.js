function getAtmosphereEndpoint(pkgName) {
  return `https://atmospherejs.com/a/packages/findByNames\?names=${pkgName}`;
}

Meteor.methods({
  getPackageParams(name, options = {}) {
    check(name, String);
    this.unblock();

    // 6.30555 is an average width of alphanumeric characters in this fontSize
    function getWidth(name) {
      if (name) {
        return 225 + name.length * 6.305555555555555;
      } else {
        return 225;
      }
    }

    function getGraph(scores, width) {
      var min = 100000,
          max = 0,
          scoreGraph= [width + "," + 80, "0,80"],
          i=0;

      scores.forEach(function(data){
        if (data.score > max) {
          max = Math.ceil(data.score);
        } else if (data.score < min) {
          min = data.score;
        } else {
          min = min;
        }
      });
      scores.forEach(function(data){
        scoreGraph.push((i++*(width/5)) + "," +
         ((30 - 30 * ((data.score-min) / (max-min))) + 23));
      });

      var stars;
      if (max > 4) {
        stars = "★★★★★";
      } else {
        stars = "★★★★★".substring(0, max) + "☆☆☆☆".substring(0, 5-max);
      }

      return {
        scores: scoreGraph, lsv: max, stars: stars
      };
    }

    var pkg = PackageInfo.findOne({name: name});
    if (! pkg || pkg.lastRequestedAt < moment().subtract(24, 'hour')) {
      Meteor.call('refreshPackageInfo', name);
      pkg = PackageInfo.findOne({name: name}) || {};
    }

    var width = getWidth(pkg.name);
    var params = {
      name: pkg.name || '',
      version: pkg.latestVersion,
      pubDate: moment(pkg.latestPublishedAt).format('MMM Do YYYY'),
      starCount: pkg.starCount || 0,
      installCount: pkg.installCount || 0,
      width: width,
      totalWidth: width+2,
      logoOffset: width-75,
    };

    if (options.graph) {
      _.extend(params, getGraph(pkg.scores, width));
    }

    return params;
  },
  refreshPackageInfo(name) {
    check(name, String);
    this.unblock();

    console.log('Trying to refresh package info for', name);
    var endpoint = getAtmosphereEndpoint(name);
    var options = {headers: {'Accept': 'application/json'}};
    var response = HTTP.get(endpoint, options);
    var pkg = response.data[0];

    var atmosphereConn = DDP.connect('https://atmospherejs.com/');
    var scoresCollection = new Meteor.Collection('scores', atmosphereConn);
    atmosphereConn.subscribe('package/dailyScores', name, function () {
      var scores = scoresCollection.find().fetch();
      if (scores) {
        PackageInfo.update({name: name}, {$set: {scores: scores}});
      }
    });

    if (pkg) {
      var modifier = {
        $set: {
          latestVersion: pkg.latestVersion.version,
          latestPublishedAt: moment(pkg.latestVersion.published.$date).toDate(),
          starCount: pkg.starCount || 0,
          installCount: pkg['installs-per-year'] || 0,
          lastRequestedAt: new Date()
        }
      };
      return PackageInfo.upsert({name: pkg.name}, modifier);
    }
  },
  incrementRequestCount(name) {
    check(name, String);
    return PackageInfo.update({name: name}, {$inc: {requestCount: 1}});
  }
});
