EmbedCode = React.createClass({
  componentDidUpdate() {
    Meteor.call('validatePackageName', this.props.packageOnDisplay, (err, res) => {
      if (err) {
        console.log('Error while validating package name', err);
        return;
      }

      if (! res) {
        this.refs.embedCode.value = 'There is no package by that name.';
      }
    });
  },

  getEmbedCode() {
    var packageName = this.props.packageOnDisplay;
    var iconPath = Meteor.absoluteUrl(`package/${packageName}`);

    var base = `[![Meteor Icon](${iconPath})](https://atmospherejs.com/`;
    if (packageName.split(':')[1]) {
      return base.concat(`${packageName.replace(/\:/, '/')})`);
    } else {
      return base.concat(`meteor/${packageName.split(':')[0]})`);
    }
  },

  selectCode() {
    this.refs.embedCode.select();
  },

  render() {
    return (
      <textarea rows="5"
                cols="50"
                readOnly="readonly"
                className="embed-code"
                ref="embedCode"
                value={this.getEmbedCode()}
                onFocus={this.selectCode} />
    );
  }
});
