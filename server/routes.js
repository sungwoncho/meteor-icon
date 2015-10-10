var config = { width: 300, height: 100, background: '#dedede', stroke: 'red' };

var serve = function(request, response) {
  var url_parts = request.url.split('/');

  var url = `https://atmospherejs.com/a/packages/findByNames?names=${url_parts[1]}`;
  var opt = {headers: {'Accept': 'application/json'}};
  HTTP.get(url, opt, function (err, res) {
    response.writeHead(200, { "Content-Type": "image/svg+xml" });
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="4" stroke="${config.stroke}" />
      <text x="20" y="20" font-family="Verdana" font-size="30">${res.data[0].name}</text>
      </svg>`);
    response.end();
  })
};


WebApp.connectHandlers.use("/image", serve);
