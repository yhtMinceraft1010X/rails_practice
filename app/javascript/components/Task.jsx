import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: { description: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleDoneStatus = this.toggleDoneStatus.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  toggleDoneStatus() {
    event.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/update/${id}`;
    const { task } = this.state;

    const newDoneStatus = (task.donestatus === "true" ? "false" : "true");

    const body = {
     name: task.name,
     description: task.description,
     donestatus: newDoneStatus
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
    .then(response => this.props.history.push(`/task/${response.id}`))
    .catch(error => console.log(error.message));

  }

  deleteTask() {
      const {
        match: {
          params: { id }
        }
      } = this.props;
      const url = `/api/v1/destroy/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => this.props.history.push("/tasks"))
        .catch(error => console.log(error.message));
    }

  render() {
    const { task } = this.state;
    const taskDescription = this.addHtmlEntities(task.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {task.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-7">
              {task.donestatus === "true"
                ? <h5 className="mb-2" style={{color: "green"}}> Done </h5>
                : <h5 className="mb-2" style={{color: "red"}}> Not Done </h5>
              }
              <p> Remember to refresh this page upon toggling Done Status </p>
              <h5 className="mb-2">Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${taskDescription}`
                }}
              />
            </div>
            <div>
              <Link to={`/updateTask/${task.id}`} className="btn custom-button">
                Update This Task
              </Link>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                Delete Task
              </button>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn status-button" onClick={this.toggleDoneStatus}>
                Toggle Done/Not Done
              </button>
            </div>
          </div>
          <Link to="/tasks" className="btn btn-link">
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }

}

export default Task;