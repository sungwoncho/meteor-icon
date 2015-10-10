var config = { width: 300, height: 100, background: '#dedede', stroke: 'red' };
var rating = function(num) {
  var res = '';
  for (var i=0; i<num; i++) { res += '★'; }
  for (var i=num+1; i<5; i++) { res += '☆'; }
  return res;
}

var serve = function(request, response) {

  var url_parts = request.url;

  console.log(url_parts);

  response.writeHead(200, { "Content-Type": "image/svg+xml" }); //, "Content-Disposition": "attachment; filename=" + fileName });
  response.write(`<svg xmlns="http://www.w3.org/2000/svg" height="${config.height}" width="${config.width}">
    <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="${config.background}" stroke-width="4" stroke="${config.stroke}" />
    <text x="0" y="15" fill="yellow">${rating(Math.random() * 1000 % 5) }</text></svg>`);

  //response.end(file, "base64");
  response.end();
};


WebApp.connectHandlers.use("/image", serve);
