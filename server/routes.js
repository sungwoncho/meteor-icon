var config = {
  width: 300,
  height: 80,
  background: '#eee',
  backgroundLogo: '#ccc',
  stroke: '#993333',
  mWidth: 60,
  mHeight: 60,
  iWidth: 15,
  fontSize: 13,
  fontFamily: 'Verdana'};

var res = { data: [{ name: "test "}]};
var lWidth = config.mWidth + config.iWidth + 25;

var logo = function(x, y) {
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
  HTTP.get(url, opt, function (err, res) {
    var data = res.data[0];
    var name, version, pubdate, starCount, installyear  = '';

    // Check to see if the response data is not empty
    if(data.length != 0){
      name = data.name;
      version = data.latestVersion.version;
      pubdate = moment(data.latestVersion.published.$date).format("MMM Do YYYY");
      starCount = data.starCount;
      installyear = data['installs-per-year'];
    }

    response.writeHead(200, { "Content-Type": "image/svg+xml" });
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
          <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="4" stroke="${config.stroke}" />
          <text x="${lWidth}" y="20" font-family="${config.fontFamily}" font-size="${config.fontSize}" font-weight="bold">meteor add ${name}</text>
          <text x="${lWidth}" y="40" font-family="${config.fontFamily}" font-size="${config.fontSize-1}" font-weight="bold">v${version}</text>
          <text x="${lWidth}" y="57" font-family="${config.fontFamily}" font-size="${config.fontSize-3}">${starCount.toLocaleString()} ★ last update ${pubdate}</text>
          <text x="${lWidth}" y="70" font-family="${config.fontFamily}" font-size="${config.fontSize-3}">${installyear.toLocaleString()} downloads in the last year</text>
          ${logo(10,10)}
      </svg>`);
    response.end();
  });
};

WebApp.connectHandlers.use("/package", serve);
