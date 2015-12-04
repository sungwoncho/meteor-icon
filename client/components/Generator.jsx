Generator = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var packageName = this.refs.packageName.value.trim();
    this.props.onCodeGenerate(packageName);
  },

  render() {
    return (
      <div className="generator">
        <form className="demo-form" onSubmit={this.handleSubmit}>
          <div className="ui action input">
            <input type="text"
                   required="required"
                   placeholder="Your package name (e.g. semantic:ui)"
                   className="package-name"
                   ref="packageName" />
                 <button className="ui blue button" type="submit">
                   Get One
                 </button>
          </div>
        </form>
      </div>
    );
  }
});
