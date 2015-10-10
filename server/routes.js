var fs = Npm.require('fs');
var s = fs.readFileSync(process.env.PWD + '/server/logoTemplate.txt').toString();
var c = { w: 300 }

WebApp.connectHandlers.use("/package", function(request, response) {
  var url = `https://atmospherejs.com/a/packages/findByNames?names=${request.url.split('/')[1]}`;
  HTTP.get(url, {headers: {'Accept': 'application/json'}}, function(err, res) {
    if (res.data.length != 0) {
      name = res.data[0].name;
      version = res.data[0].latestVersion.version;
      pubdate = moment(res.data[0].latestVersion.published.$date).format("MMM Do YYYY");
      starCount = res.data[0].starCount;
      installyear = res.data[0]['installs-per-year'];
    }

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    s = s.replace(/\$wi/g, c.w).replace("$n", name).replace("$v", version).replace("$p", pubdate).
          replace("$s", starCount.toLocaleString()).replace("$i", installyear.toLocaleString());
    response.write(s);
    response.end();
  });
});
