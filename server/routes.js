WebApp.connectHandlers.use("/package", function (request, response) {
  SSR.compileTemplate('icon', Assets.getText('icon.svg'));

  var pkgName = request.url.split('/')[1];

  Meteor.call('getPackageParams', pkgName, {graph: true}, function (err, params) {
    if (err) {
      console.log('Error occurred while getting package params', err);
      response.end(err.message);
    }

    Meteor.call('incrementPackageCounter', pkgName);

    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    var icon = SSR.render('icon', params);
    response.end(icon);
  });
});
