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

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    var width = 225 + name.length * 6.305555555555555;
    var icon = SSR.render('icon', {w: width, totalW: width+2, n: name,
      v: version, p: pubDate, s: starCount, i: installYear});

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    response.end(icon);
  });
});
