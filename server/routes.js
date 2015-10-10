var f = "MMM Do YYYY";

WebApp.connectHandlers.use("/package", function(request, response) {
  var url = `https://atmospherejs.com/a/packages/findByNames\
?names=${request.url.split('/')[1]}`;
  console.log(url);
  HTTP.get(url, {headers: {'Accept': 'application/json'}}, function(err, res) {
    if (res.data.length != 0) {
      name = res.data[0].name;
      version = res.data[0].latestVersion.version;
      pubdate = moment(res.data[0].latestVersion.published.$date).format(f);
      starCount = res.data[0].starCount;
      installyear = res.data[0]['installs-per-year'];
    }

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    var params = {width: 300, n: name, v: version, p: pubdate,
      s: starCount.toLocaleString(), i: installyear.toLocaleString()};
    var icon = SSR.render('icon', params);

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    response.write(icon);
    response.end();
  });
});
