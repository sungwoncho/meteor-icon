Generator = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var packageName = this.refs.packageName.value.trim();
    this.props.onCodeGenerate(packageName);
  },

  render() {
    return (
      <div>
        <form className="demo-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 required="required"
                 placeholder="Your package name (e.g. semantic:ui)"
                 className="package-name"
                 ref="packageName" />
          <input type="submit"
                 value="Get one"/>
        </form>
      </div>
    );
  }
});
