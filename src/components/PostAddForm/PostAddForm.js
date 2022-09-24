import { Component } from "react";
import "./PostAddForm.css";

export default class PostAddForm extends Component {
  state = {
    text: "",
  };
  onValueChange = (e) => {
    this.setState({ text: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.length) {
      this.props.onAdd(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="bottom-panel d-flex">
        <input
          type="text"
          placeholder="What are you thinking about?"
          className="form-control new-post-label"
          onChange={this.onValueChange}
          value={this.state.text}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Add Posts
        </button>
      </form>
    );
  }
}
