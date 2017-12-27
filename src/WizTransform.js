import React, { Component } from 'react';
import _ from 'underscore';


const TRANSFORMERS = [
    {
        slug: "tag",
        title: "Crop to HTML tag",
        placeholder: "tagname",
    },
    {
        slug: "css",
        title: "Crop to CSS Selector",
        placeholder: "selector",
    },
    {
        slug: "css-all",
        title: "Crop to all matching CSS Selectors",
        placeholder: "selector",
    },
    {
        slug: "xpath",
        title: "Crop to XPATH",
        placeholder: "path",
    },
    {
        slug: "changes",
        title: "Replace with changes to previous",
        placeholder: "type",
    },
    {
        slug: "python",
        title: "Python script",
        placeholder: "code",
    },
    {
        slug: "bash",
        title: "Bash script",
        placeholder: "code",
    },
    {
        slug: "jinja",
        title: "Jinja2 template",
        placeholder: "template",
    },
    {
        slug: "jq",
        title: "Execute jq",
        placeholder: "template",
    },
    {
        slug: "text",
        title: "Strip down HTML markup",
    },
    {
        slug: "json",
        title: "Prettify JSON data",
    },
]
const PLACEHOLDERS = _.object(_.map(TRANSFORMERS, (t) => {
  return [t.slug, t.placeholder];
}));


class Transform extends Component {
  constructor(props) {
    super(props);
    this.handleTransformChange = this.handleTransformChange.bind(this);
    this.handleArgumentChange = this.handleArgumentChange.bind(this);
  }

  handleTransformChange(event) {
    this.props.onChange(
      this.props.idx,
      {
        'transform': event.target.value,
        'argument': this.props.argument,
      }
    );
  }

  handleArgumentChange(event) {
    this.props.onChange(
      this.props.idx,
      {
        'transform': this.props.transform,
        'argument': event.target.value,
      }
    );
  }

  render() {
    let argument;
    if (hasArgument(this.props.transform)) {
      argument = <input
        type="text"
        placeholder={PLACEHOLDERS[this.props.transform]}
        onChange={this.handleArgumentChange}
        value={this.props.argument}
      />
    } else {
      argument = null
    }
    const options = _.map(TRANSFORMERS, (t) => {
      return (
        <option value={t.slug}>{t.title}</option>
      )
    });
    return (
      <p>
        <select value={this.props.transform} onChange={this.handleTransformChange}>
          {options}
        </select>
        {argument}
      </p>
    )
  }
}


class WizTransform extends Component {
  constructor(props) {
      super(props);
      const default_transform = {
        'transform': 'css',
        'argument': '#npm-expansions'
      }
      this.state = {
          transforms: [],  // default_transform],
          default_transform: default_transform,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleTransforms(this.state.transforms);
  }

  handleChange(idx, data) {
    let transforms = this.state.transforms.slice();
    transforms[idx] = data;
    this.setState({transforms: transforms});
    this.handleTransforms(transforms);
  }
  
  handleTransforms(transforms) {
    return this.props.handleTransforms(
      this.clearTransforms(transforms)
    );
  }
  
  clearTransforms(transforms) {
    return transforms.map((data, idx) =>{
      return {
        transform: data.transform,
        argument: hasArgument(data.transform) ? data.argument : null,
      }
    });
  }
  
  handleAdd() {
    const transforms = this.state.transforms.concat(this.state.default_transform)
    this.setState({transforms: transforms});
    this.handleTransforms(transforms);
  }

  render() {
    const elems = this.state.transforms.map((data, idx) => {
      return (
        <Transform
          idx={idx}
          key={idx}
          transform={data.transform}
          argument={data.argument}
          onChange={this.handleChange}
        />
      )
    })
    return (
      <div>
        <label>
          <h2>Transforms:</h2>
          {elems}
          <button onClick={() => this.handleAdd()}>Add transform</button>
        </label>
      </div>
    );
  }
}

function hasArgument(slug) {
  if (_.has(PLACEHOLDERS, slug) && PLACEHOLDERS[slug]) {
    return true;
  }
  return false;
}

export default WizTransform;
