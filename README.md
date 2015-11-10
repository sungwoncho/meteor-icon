# Meteor Icon

A simple Atmosphere badge to display the information about your package anywhere.

Winner of [2015 Meteor Global Distributed Hackathon]
(http://info.meteor.com/blog/meteor-global-distributed-hackathon-winners) for
the Best Submission using less than 100 Lines of JavaScript.


## Why?

Meteor Icon builds better package ecosystem for Meteor by making it quicker
and easier to communicate package information.

We wanted to authors to aggregate package information and present it
with a swag. Doing so also benefits users as they don't have to jump between
Atmosphere and GitHub to collect information about the package.

Inspired by [nodei.co](https://nodei.co/), Meteor Icon cleanly displays
information including the install command, latest version, last published date,
popularity measures.


## How to use

1. Go to [icon.meteor.com](http://icon.meteor.com/) and type in your package name.
2. Grab the markdown code and embed into GitHub or anywhere you want!

![](https://github.com/sungwoncho/meteor-icon/blob/master/assets/example.png)

```md
[![Meteor Icon](http://icon.meteor.com/package/tomi:upload-jquery)]
(https://atmospherejs.com/tomi/upload-jquery)
```


## Options

* Default

[![Meteor Icon](http://icon.meteor.com/package/tomi:upload-jquery)]
(https://atmospherejs.com/tomi/upload-jquery)

*http://icon.meteor.com/package/tomi:upload-jquery*

* Graph and scores

Draw on graph and scores by appending passing a query parameter graph with true

[![Meteor Icon](http://icon.meteor.com/package/tomi:upload-jquery?graph=true)]
(https://atmospherejs.com/tomi/upload-jquery)

*http://icon.meteor.com/package/tomi:upload-jquery?graph=true*


## Video Demo

[![Demo](http://img.youtube.com/vi/NQm33Wg1HHg/0.jpg)]
(https://www.youtube.com/watch?v=NQm33Wg1HHg "Demo")


## Collaborators

From [Meteor Sydney](http://www.meetup.com/Meteor-Sydney/):

* [sungwoncho](https://github.com/sungwoncho/)
* [tomitrescak](https://github.com/tomitrescak)
* [woody1990](https://github.com/woody1990)


## Roadmap

- [x] Caching by comparing timestamp
- [ ] Support for MDG packages


## Contributing

Feel free to open an issue with a feature request or a bug.


## License

MIT
