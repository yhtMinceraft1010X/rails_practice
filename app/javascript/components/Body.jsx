import React from "react";
import { Link } from "react-router-dom";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount(){
      fetch('/api/v1/tasks/index')
        .then((response) => {return response.json()})
        .then((data) => {this.setState({ tasks: data }) });
    }
  render(){
      return(
        <div>
          <AllTasks tasks={this.state.tasks} />
        </div>
      )
  }
}