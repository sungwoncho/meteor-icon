function calcWidth(name) {
  return 250 + name.length * 6.305555555555555;
}

WebApp.connectHandlers.use("/package", function(request, response) {
  var url = `https://atmospherejs.com/a/packages/findByNames\
?names=${request.url.split('/')[1]}`;
  var opts = {headers: {'Accept': 'application/json'}};
  HTTP.get(url, opts, function(err, res) {
    var name = '', version, pubDate, startCount, installYear;
    var payload = res.data[0];

    if (res.data.length !== 0) {
      name = payload.name;
      version = payload.latestVersion.version;
      pubDate = moment(payload.latestVersion.published.$date)
                      .format('MMM Do YYYY');
      starCount = payload.starCount.toLocaleString();
      installYear = payload['installs-per-year'].toLocaleString();
    }

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    var width = calcWidth(name);
    var icon = SSR.render('icon', {w: width, totalW: width+2, n: name,
      v: version, p: pubDate, s: starCount, i: installYear});

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    response.end(icon);
  });
});
