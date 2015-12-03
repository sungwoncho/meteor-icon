EmbedCode = React.createClass({
  getEmbedCode() {
    var fullName = this.props.packageOnDisplay;
    var iconPath = Meteor.absoluteUrl(`package/${fullName}`);

    var base = `[![Meteor Icon](${iconPath})](https://atmospherejs.com/`;
    if (fullName.split(':')[1]) {
      return base.concat(`${fullName.replace(/\:/, '/')}`);
    } else {
      return base.concat(`meteor/${fullName.split(':')[0]})`);
    }
  },

  render() {
    return (
      <textarea rows="5"
                cols="50"
                readOnly="readonly"
                className="embed-code"
                value={this.getEmbedCode()} />
    );
  }
});
