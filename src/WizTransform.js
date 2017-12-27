import React, { Component } from 'react';


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
        onChange={this.handleArgumentChange}
        value={this.props.argument}
      />
    } else {
      argument = null
    }
    return (
      <p>
        <select value={this.props.transform} onChange={this.handleTransformChange}>
          <option value="text">Strip down HTML markup</option>
          <option value="css">Crop HTML by CSS Selector</option>
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
          transforms: [default_transform],
          default_transform: default_transform,
      };
      this.handleChange = this.handleChange.bind(this);
      this.props.handleTransforms(this.state.transforms);
  }

  handleChange(idx, data) {
    let transforms = this.state.transforms.slice();
    transforms[idx] = data;
    this.setState({transforms: transforms});
    this.props.handleTransforms(this.clearTransforms(transforms));
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
    this.props.handleTransforms(transforms);
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

function hasArgument(transform) {
  if (transform === "css") {
    return true;
  }
  return false;
}

export default WizTransform;
