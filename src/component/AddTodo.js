import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

class AddTodo extends Component {
  // Create a local react state of the this component with both content date property set to nothing.
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
    };
  }
  // The handleChange function updates the react state with the new input value provided from the user and the current date/time.
  // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
  // into the text field.
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };
  // The handleSubmit function collects the forms input and puts it into the react state.
  // event.preventDefault() is called to prevents default event behavior like refreshing the browser.
  // this.props.addTodo(this.state) passes the current state (or user input and current date/time) into the addTodo function defined
  // in the Home.js file which then adds the input into the list.
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.date == "Invalid Date" || this.state.date == "") {
      return;
    }

    if (this.state.content.trim()) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
      });
    }
  };
  render() {
    return (
      // 1. When rendering a component, you can render as many elements as you like as long as it is wrapped inside
      // one div element.
      // 2. The return statement should include a text field input with the handleChange function from above that
      // is passed into an onChange event.
      // 3. The return should also include a button with the handleSubmit function from above that is passed into
      // an OnClick event.
      // 4. The value of the text field also should reflect the local state of this component.
      <div
        style={{
          display: "flex",
          gap: 8,
          flexDirection: "column",
          flexBasis: "400px",
          width: "20%",
          margin: "auto",
        }}
      >
        <TextField
          label="Add New Item"
          variant="outlined"
          data-testid="new-item-input"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            data-testid="new-item-date"
            label="Due Date"
            value={this.state.date ?? ""}
            onChange={(newDate) =>
              this.setState({ date: newDate.toLocaleDateString() })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          data-testid="new-item-button"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
