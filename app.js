// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);
//
//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });
//
//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }
//
// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

// var drawStar(x, y, width, height, strokeWidth, fillColor, strokeColor) {
//   '<polygon points="' +
//   x + ',' + y + ' ' +
//   (x + width/2) + ',' + (y + height) + ' ' +
//   (x + width) + ',' + y + ' ' +
//   x + ',' + (y + ' ' +
//   (x + width) + ',' + y + '" ' +
//   'style="fill:' + fillColor' + ';' +
//   'stroke:' + strokeColor' + ';' +
//   'stroke-width:' + stroke-width + ';fill-rule:nonzero;"/>'
// }

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
}


WebApp.connectHandlers.use("/image", serve);
