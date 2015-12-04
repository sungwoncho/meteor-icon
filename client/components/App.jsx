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
      <div>
        <div className="ui center aligned grid">
          <div className="column eight wide" id="main-box">
            <img className="ui centered small image" id="logo" src="/images/logo.png" alt="logo" />
            <h1 className="ui center aligned header">
              Meteor Icon
              <div className="sub header">
                A smarter way to communicate with package users
              </div>
            </h1>

            <p>
              You can get one for your package today.
            </p>

            <Generator onCodeGenerate={this.handleGenerate} />
            <Preview packageOnDisplay={this.state.packageOnDisplay} />
            <EmbedCode packageOnDisplay={this.state.packageOnDisplay} />
          </div>
        </div>

        <footer>
          <a href="https://github.com/sungwoncho/meteor-icon" target="_blank">
            GitHub repo
          </a>
        </footer>
      </div>
    );
  }
});
