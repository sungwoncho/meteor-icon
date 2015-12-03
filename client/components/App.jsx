App = React.createClass({
  getInitialState() {
    return {
      packageOnDisplay: 'tomi:upload-jquery'
    };
  },

  handleGenerate(packageName) {
    this.setState({packageOnDisplay: packageName});
  },

  render() {
    return (
      <main>
        <h1>Meteor Icon</h1>

        <Preview packageOnDisplay={this.state.packageOnDisplay} />
        <EmbedCode packageOnDisplay={this.state.packageOnDisplay} />
        <Generator onCodeGenerate={this.handleGenerate} />

        <footer>
          <a href="https://github.com/sungwoncho/meteor-icon" target="_blank">
            GitHub page
          </a>
        </footer>
      </main>
    );
  }
});
