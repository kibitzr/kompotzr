import React, { Component } from 'react';


class WizUrl extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: "https://www.npmjs.com/",
      };
      this.handleChange = this.handleChange.bind(this);
      this.props.handleUrl(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleUrl(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          URL:
          <input type="text"
                 value={this.state.value}
                 onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

export default WizUrl;
