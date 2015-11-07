PackageInfo = new Mongo.Collection('packageInfo');

var schema = new SimpleSchema({
  name: {
    type: String
  },
  latestVersion: {
    type: String
  },
  latestPublishedAt: {
    type: Date
  },
  starCount: {
    type: Number
  },
  installCount: {
    type: Number
  },
  scores: {
    type: [Object],
    optional: true,
    blackbox: true
  },
  // Last time the icon for this package was requested
  lastRequestedAt: {
    type: Date,
    optional: true
  },
  requestCount: {
    type: Number,
    optional: true
  }
});

PackageInfo.attachSchema(schema);
