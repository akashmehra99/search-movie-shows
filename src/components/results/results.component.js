import React, { Component } from "react";
import { connect } from "react-redux";

import "./results.component.css";
import { discoverAPI } from "../../api/discover.api";

import { throttle } from "../../util/throttle";
import { debounce } from "../../util/debounce";

import {
  setResults,
  resetResults,
  setPage
} from "../../actions/discover";

const discoverApi = discoverAPI();

class Results extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.getResults = throttle(this.getResults.bind(this), 200);
    this.onScroll = debounce(this.onScroll.bind(this), 500);
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

  onScroll() {
    if (this.myRef.current) {
      const { scrollTop, scrollHeight } = this.myRef.current;
      const scrollRatioCovered = (scrollTop / scrollHeight);
      if (scrollRatioCovered >= 0.70) {
        console.log("Scroll top -> ", scrollTop, scrollHeight, scrollRatioCovered, this.props.page);
        this.getResults({
          page: this.props.page,
          contentType: this.props.contentType,
          genre: this.props.genre,
          category: this.props.category
        });
      }
    }
  }

  getResults({ page = 1, contentType, genre, category}) {
    discoverApi
      .getResults({ page, contentType, genre, category })
      .then((res) => {
        console.log("Discover api response => ", res);
        this.props.dispatch(setPage(res.page + 1));
          this.props.dispatch(setResults(res.results));
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div
        className="results-container"
        ref={this.myRef}
        onScroll={this.onScroll}
      >
        {this.props.results &&
          this.props.results.map((result) => {
            return (
              <div className="content-card" key={result.id} tabIndex={0}>
                <img
                  alt="Not bale to load image"
                  width={"300x"}
                  height={"500px"}
                  src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
                ></img>
                <div className="content_title">
                  {result.title || result.name}
                </div>
              </div>
            );
          })}
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
