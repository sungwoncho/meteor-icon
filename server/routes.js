var c = { w: 300, h: 80, bg: '#eee', bgLogo: '#ccc', stroke: '#993333',
          mw: 60, mh: 60, iw: 15, fsize: 13 },
    lWidth = c.mw + c.iw + 25,
    logo = function(x, y) {
      return `<rect x="${x}" y="${y}" w="${c.mw}" h="${c.mh}" fill="${c.bgLogo}" />
          <rect x="${x+c.mw+5}" y="${y}" w="${c.iw}" h="10" fill="${c.bgLogo}" />
          <rect x="${x+c.mw+5}" y="${y+15}" w="${c.iw}" h="${c.mh-15}" fill="${c.bgLogo}" />
          <line x1="${x + c.mw - 30}" y1="${y+15}" x2="${x + c.mw - 30}" y2="${y+c.mh}" />
          <line x1="${x + c.mw - 15}" y1="${y+15}" x2="${x + c.mw - 15}" y2="${y+c.mh}" />`
    }

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
    response.write(`<svg xmlns="http://www.w3.org/2000/svg" h="${c.h}" w="${c.w}">
      <defs><style type="text/css"><![CDATA[ rect, line { stroke: #993333; stroke-w: 4 } text { font-family: Verdana } ]]></style></defs>
      <rect x="0" y="0" w="${c.w}" h="${c.h}" fill="${c.bg}" stroke-w="4" stroke="${c.stroke}" />
      <text x="${lWidth}" y="20" font-size="${c.fsize}" font-weight="bold">meteor add ${name}</text>
      <text x="${lWidth}" y="40" font-size="${c.fsize}" font-weight="bold">v${version}</text>
      <text x="${lWidth}" y="57" font-size="${c.fsize-3}">${starCount.toLocaleString()} ★ last update ${pubdate}</text>
      <text x="${lWidth}" y="70" font-size="${c.fsize-3}">${installyear.toLocaleString()} downloads in the last year</text>
      ${logo(10,10)}
    </svg>`);
    response.end();
  });
});
