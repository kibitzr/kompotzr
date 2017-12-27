import React, { Component } from 'react';
import './App.css';
import './Inputs.css';
import WizUrl from './WizUrl';
import WizTransform from './WizTransform';
import Clipboard from 'react-clipboard.js';
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
        <div className="App-intro">
          Browser interface for composing Kibitzr configuration.
        </div>
        <div className="App-body">
          <WizUrl
            handleUrl={(url) => this.handleUrl(url)} />
          <WizTransform
            handleTransforms={(transforms) => this.handleTransforms(transforms)} />
          {this.renderConfig()}
        </div>
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
    return (
      <div className="yaml-wrapper">
        <p 
          id="yaml"
          className="yaml"
          dangerouslySetInnerHTML={ render_yaml(this.state) } />
        <Clipboard className="btn" data-clipboard-target="#yaml">
          Copy to clipboard
        </Clipboard>
      </div>
    )
  }
}

// https://github.com/addyosmani/backbone-fundamentals/issues/364
_.templateSettings = {
  evaluate: /{{\s+(.+?)\s+}}/g,
  interpolate: /{{=(.+?)}}/g,
  escape: /{{-(.+?)}}/g
};
const yaml_template = _.template(`<b>checks</b>:
  - <b>url</b>: {{= url }}
{{ if (transforms.length > 0) {
}}    <b>transform</b>:
{{
    _.each(transforms, function(t) {
}}      - <b>{{= t.transform }}</b>{{
        if (t.argument) {
          }}: '{{= t.argument }}'{{
        }; }}
{{  }); }}{{
} }}    <b>notify</b>:
      - <b>python</b>: print(content)
`);

function render_yaml(config) {
  return {
    __html: yaml_template(config)
  };
}

export default App;
