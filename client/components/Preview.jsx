Preview = React.createClass({
  getIconPath() {
    return `package/${this.props.packageOnDisplay}`;
  },

  render() {
    return (
      <div>
        <img src={this.getIconPath()} className="demo-icon"/>
      </div>
    );
  }
});
