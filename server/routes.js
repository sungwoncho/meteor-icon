// Check that a string is truthy and not equal to 'false'
function toBoolean(str) {
  return str && str !== 'false';
}

WebApp.connectHandlers.use("/package", function (req, res) {
  var pkgName = req._parsedUrl.pathname.split('/')[2];
  var options = {
    graph: toBoolean(req.query.graph)
  };

  Meteor.call('getPackageParams', pkgName, options, function (err, params) {
    if (err) {
      console.log('Error occurred while getting package params', err);
      return res.end(err.message);
    }

    Meteor.call('incrementRequestCount', pkgName);

    SSR.compileTemplate('icon', Assets.getText('icon.svg'));
    res.writeHead(200, {"Content-Type": "image/svg+xml"});
    res.end(SSR.render('icon', params));
  });
});
