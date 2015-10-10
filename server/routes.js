var config = {
  width: 300,
  height: 100,
  background: '#eee',
  backgroundLogo: '#ccc',
  stroke: '#993333',
  mWidth: 60,
  mHeight: 60,
  iWidth: 15 };

var res = { data: [{ name: "test "}]};

var logo = function(x, y, width, height) {
  var i=15;
  return `<rect x="${x}" y="${y}" width="${config.mWidth}" height="${config.mHeight}" stroke-width="4" stroke="${config.stroke}" fill="${config.backgroundLogo}" />
      <rect x="${x+config.mWidth+5}" y="${y}" width="${config.iWidth}" height="10" stroke-width="4" stroke="${config.stroke}" fill="${config.backgroundLogo}" />
      <rect x="${x+config.mWidth+5}" y="${y+15}" width="${config.iWidth}" height="${config.mHeight-15}" stroke-width="4" stroke="${config.stroke}" fill="${config.backgroundLogo}" />
      <line x1="${x + config.mWidth - 30}" y1="${y+15}" x2="${x + config.mWidth - 30}" y2="${y+config.mHeight}" style="stroke:${config.stroke};stroke-width:4" />
      <line x1="${x + config.mWidth - 15}" y1="${y+15}" x2="${x + config.mWidth - 15}" y2="${y+config.mHeight}" style="stroke:${config.stroke};stroke-width:4" />
      `
}

var serve = function(request, response) {
  var url_parts = request.url.split('/');

  var url = `https://atmospherejs.com/a/packages/findByNames?names=${url_parts[1]}`;
  var opt = {headers: {'Accept': 'application/json'}};
  //HTTP.get(url, opt, function (err, res) {
    response.writeHead(200, { "Content-Type": "image/svg+xml" });
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
      <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="6" stroke="${config.stroke}" />
      <text x="70" y="20" font-family="Verdana" font-size="30">${res.data[0].name}</text>
      ${logo(20, 20)}
      </svg>`);
    response.end();
  //})
};

WebApp.connectHandlers.use("/image", serve);
