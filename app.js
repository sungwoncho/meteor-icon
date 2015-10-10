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


var serve = function(request, response) {

  var url_parts = request.url;

  console.log(url_parts);


  response.writeHead(200, { "Content-Type": "text/html" }); //, "Content-Disposition": "attachment; filename=" + fileName });
  response.write(url_parts);
  //response.end(file, "base64");
  response.end();
}


WebApp.connectHandlers.use("/image", serve);
