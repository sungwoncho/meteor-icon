var config = { width: 400, height: 100, background: '#dedede', stroke: 'red' };

var serve = function(request, response) {
  var url_parts = request.url.split('/');

  var url = `https://atmospherejs.com/a/packages/findByNames?names=${url_parts[1]}`;
  var opt = {headers: {'Accept': 'application/json'}};
  HTTP.get(url, opt, function (err, res) {

    var name = '';
    var version = '';
    var pubdate = '';
    var starCount = '';
    var installyear = '';

    // Check to see if the response data is not empty
    if(res.data.length != 0){
      name = res.data[0].name;
      version = res.data[0].latestVersion.version;
      pubdate = moment(res.data[0].latestVersion.published.$date).format("MMM Do YY");
      starCount = res.data[0].starCount;
      installyear = res.data[0]['installs-per-year'];
    }

    response.writeHead(200, { "Content-Type": "image/svg+xml" });
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="4" stroke="${config.stroke}" />
          <text x="20" y="20" font-family="Verdana" font-size="15">meteor add ${name}</text>
          <text x="20" y="40" font-family="Verdana" font-size="15">${version} @ ${pubdate}</text>
          <text x="20" y="60" font-family="Verdana" font-size="15">${starCount}</text>
          <text x="20" y="80" font-family="Verdana" font-size="15">${installyear}</text>
      </svg>`);
    response.end();
  });
};

WebApp.connectHandlers.use("/package", serve);
