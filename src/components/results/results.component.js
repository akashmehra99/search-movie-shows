import React, { Component } from "react";
import { connect } from "react-redux";

import "./results.component.css";
import { discoverAPI } from "../../api/discover.api";

import { throttle } from "../../util/throttle";
import { debounce } from "../../util/debounce";

const discoverApi = discoverAPI();

class Results extends Component {
  constructor(props) {
    super(props);
    this.getResults = throttle(this.getResults, 200);
  }

  componentDidMount() {
    this.getResults({
      contentType: "movie",
      category: "popular",
    });
  }

  componentDidUpdate(newProps) {
    if (
      newProps.contentType !== this.props.contentType ||
      newProps.genre !== this.props.genre ||
      newProps.category !== this.props.category
    ) {
      this.getResults({
        contentType: this.props.contentType,
        genre: this.props.genre,
        category: this.props.category,
      });
    }
  }

  getResults({ page = 1, contentType, genre, category }) {
    discoverApi
      .getResults({ page, contentType, genre, category })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div className="results-container">
        <div>Results</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.discover.results,
    page: state.discover.page,
    genre: state.discover.genre,
    contentType: state.discover.contentType,
    category: state.discover.category,
  };
};

const ConnectedComponent = connect(mapStateToProps)(Results);

export default ConnectedComponent;
