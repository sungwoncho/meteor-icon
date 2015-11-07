function getAtmosphereEndpoint(pkgName) {
  return `https://atmospherejs.com/a/packages/findByNames\?names=${pkgName}`;
}

Meteor.methods({
  getPackageParams(name) {
    check(name, String);
    this.unblock();
    var endpoint = getAtmosphereEndpoint(name);
    var options = {headers: {'Accept': 'application/json'}};

    // 6.30555 is an average width of alphanumeric characters in this fontSize
    function getWidth(name) {
      if (name) {
        return 225 + name.length * 6.305555555555555;
      } else {
        return 225;
      }
    }

    var pkg = PackageInfo.findOne({name: name});
    if (! pkg || pkg.lastRequestedAt < moment().subtract(24, 'hour')) {
      Meteor.call('refreshPackageInfo', name);
      pkg = PackageInfo.findOne({name: name}) || {};
    }

    var params = {
      name: pkg.name || '',
      version: pkg.latestVersion,
      pubDate: moment(pkg.latestPublishedAt).format('MMM Do YYYY'),
      starCount: pkg.starCount || 0,
      installCount: pkg.installCount || 0,
      width: getWidth(pkg.name),
      totalWidth: getWidth(pkg.name)+2,
      logoOffset: getWidth(pkg.name)-75
    };
    return params;
  },
  refreshPackageInfo(name) {
    check(name, String);
    this.unblock();

    console.log('Trying to refresh package info for', name);
    var endpoint = getAtmosphereEndpoint(name);
    var options = {headers: {'Accept': 'application/json'}};

    var response = HTTP.get(endpoint, options);
    var pkg = response.data[0];

    if (pkg) {
      var modifier = {
        $set: {
          latestVersion: pkg.latestVersion.version,
          latestPublishedAt: moment(pkg.latestVersion.published.$date).toDate(),
          starCount: pkg.starCount || 0,
          installCount: pkg['installs-per-year'] || 0,
          lastRequestedAt: new Date()
        }
      };
      return PackageInfo.upsert({name: pkg.name}, modifier);
    }
  },
  incrementPackageCounter(name) {
    check(name, String);
    return PackageInfo.update({name: name}, {$inc: {requestCount: 1}});
  }
});
