Preview = React.createClass({
  getIconPath() {
    return `package/${this.props.packageOnDisplay}`;
  },

  render() {
    return (
      <img src={this.getIconPath()} className="demo-icon"/>
    );
  }
});
