WebApp.connectHandlers.use("/package", function (request, response) {
  var pkgName = request.url.split('/')[1];

  Meteor.call('getPackageParams', pkgName, {graph: true}, function (err, params) {
    if (err) {
      console.log('Error occurred while getting package params', err);
      return response.end(err.message);
    }

    Meteor.call('incrementRequestCount', pkgName);

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    response.end(SSR.render('icon', params));
  });
});
