function calcWidth(name) {
  return 250 + name.length * 6.305555555555555;
}

WebApp.connectHandlers.use("/package", function(request, response) {
  if(request.url.split('/')[1] != ''){
  var url = `https://atmospherejs.com/a/packages/findByNames\
?names=${request.url.split('/')[1]}`;
  HTTP.get(url, {headers: {'Accept': 'application/json'}}, function(err, res) {
    var name = '';
    var f = "MMM Do YYYY";
    var payload = res.data[0];

    if (res.data.length != 0) {
      var name = payload.name;
      var version = payload.latestVersion.version;
      var pubdate = moment(payload.latestVersion.published.$date).format(f);
      var starCount = payload.starCount.toLocaleString();
      var installyear = payload['installs-per-year'].toLocaleString();
    }

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    var width = calcWidth(name);
    var params = {w: width, totalW: width+2, n: name, v: version, p: pubdate,
      s: starCount, i: installyear};
    var icon = SSR.render('icon', params);

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    response.end(icon);
  });
}
});
