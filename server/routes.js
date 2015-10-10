var config = { width: 300, height: 80, background: '#eee', backgroundLogo: '#ccc',
  stroke: '#993333', mWidth: 60, mHeight: 60, iWidth: 15, fontSize: 13
}, lWidth = config.mWidth + config.iWidth + 25, logo = function(x, y) {
  var i = 15;
  return `<rect x="${x}" y="${y}" width="${config.mWidth}" height="${config.mHeight}" fill="${config.backgroundLogo}" />
      <rect x="${x+config.mWidth+5}" y="${y}" width="${config.iWidth}" height="10" fill="${config.backgroundLogo}" />
      <rect x="${x+config.mWidth+5}" y="${y+15}" width="${config.iWidth}" height="${config.mHeight-15}" fill="${config.backgroundLogo}" />
      <line x1="${x + config.mWidth - 30}" y1="${y+15}" x2="${x + config.mWidth - 30}" y2="${y+config.mHeight}" />
      <line x1="${x + config.mWidth - 15}" y1="${y+15}" x2="${x + config.mWidth - 15}" y2="${y+config.mHeight}" />`
}

var serve = function(request, response) {
  HTTP.get(`https://atmospherejs.com/a/packages/findByNames?names=${request.url.split('/')[1]}`,
      { headers: { 'Accept': 'application/json' } }, function(err, res) {
    // Check to see if the response data is not empty
    if (res.data.length != 0) {
      name = res.data[0].name;
      version = res.data[0].latestVersion.version;
      pubdate = moment(res.data[0].latestVersion.published.$date).format("MMM Do YYYY");
      starCount = res.data[0].starCount;
      installyear = res.data[0]['installs-per-year'];
    }

    response.writeHead(200, {
      "Content-Type": "image/svg+xml"
    });
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
    <defs><style type="text/css"><![CDATA[ rect, line { stroke: #993333; stroke-width: 4 } text { font-family: Verdana } ]]></style></defs>
          <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="4" stroke="${config.stroke}" />
          <text x="${lWidth}" y="20" font-size="${config.fontSize}" font-weight="bold">meteor add ${name}</text>
          <text x="${lWidth}" y="40" font-size="${config.fontSize}" font-weight="bold">v${version}</text>
          <text x="${lWidth}" y="57" font-size="${config.fontSize-3}">${starCount.toLocaleString()} ★ last update ${pubdate}</text>
          <text x="${lWidth}" y="70" font-size="${config.fontSize-3}">${installyear.toLocaleString()} downloads in the last year</text>
          ${logo(10,10)}
      </svg>`);
    response.end();
  });
};

WebApp.connectHandlers.use("/package", serve);
