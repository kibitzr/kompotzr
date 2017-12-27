import React, { Component } from 'react';
import './App.css';
import WizUrl from './WizUrl';
import WizTransform from './WizTransform';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      url: null,
      transforms: [],
    };
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kompotzr</h1>
        </header>
        <p className="App-intro">
          Browser interface for composing Kibitzr configuration.
        </p>
        <WizUrl
          handleUrl={(url) => this.handleUrl(url)} />
        <WizTransform
          handleTransforms={(transforms) => this.handleTransforms(transforms)} />
        {this.renderConfig()}
      </div>
    );
  }
  
  handleUrl(url) {
    this.setState({url: url});
  }
  
  handleTransforms(transforms) {
    this.setState({transforms: transforms});
  }
  
  config_content() {
    const config = this.state;
    const transforms = config.transforms.map((data, idx) => {
      if (data.argument !== null) {
        return '      - ' + data.transform + ': ' + data.argument + '\n';
      } else {
        return '      - ' + data.transform + '\n';
      }
    })
    const text = `checks:
  - url: ` + config.url + `
    transform:
` + transforms + `
`;
    return { __html: text };
  }

  renderConfig() {
    return <p 
      className="config-code"
      style={{ whiteSpace: 'pre-wrap' }} 
      dangerouslySetInnerHTML={ this.config_content() } 
    />
  }
}

export default App;
