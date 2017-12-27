import React, { Component } from 'react';
import './App.css';
import WizUrl from './WizUrl';
import WizTransform from './WizTransform';
import _ from 'underscore';


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
  
  renderConfig() {
    return <p 
      className="config-code"
      style={{ whiteSpace: 'pre-wrap' }} 
      dangerouslySetInnerHTML={ render_yaml(this.state) } 
    />
  }
}

// https://github.com/addyosmani/backbone-fundamentals/issues/364
_.templateSettings = {
  evaluate: /{{\s+(.+?)\s+}}/g,
  interpolate: /{{=(.+?)}}/g,
  escape: /{{-(.+?)}}/g
};
const yaml_template = _.template(`checks:
  - url: {{= url }}
{{ if (transforms.length > 0) {
}}    transforms:{{
    _.each(transforms, function(t) { }}
      - {{= t.transform }}{{
        if (t.argument) {
          }}: {{= t.argument }}{{
        }; }}{{
    }); }}{{
} }}
`);

function render_yaml(config) {
  return {
    __html: yaml_template(config)
  };
}

export default App;
