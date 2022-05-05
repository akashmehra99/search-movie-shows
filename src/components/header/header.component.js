import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import "./header.component.css";

import { setCategory, resetResults } from "../../actions/discover";

class Header extends Component {
  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(event) {
    const category = event.currentTarget.getAttribute("category-val");
    this.props.dispatch(resetResults());
    this.props.dispatch(setCategory(category));
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="title">Discover</div>
          <div className="menu">
            <Button
              variant="text"
              size="large"
              onClick={this.selectCategory}
              category-val="popular"
              className={`${
                this.props.category === "popular" ? "selectedBtn" : ""
              }`}
            >
              Popular
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={this.selectCategory}
              category-val="trend"
              className={`${
                this.props.category === "trend" ? "selectedBtn" : ""
              }`}
            >
              Trend
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={this.selectCategory}
              category-val="latest"
              className={`${
                this.props.category === "latest" ? "selectedBtn" : ""
              }`}
            >
              Newest
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={this.selectCategory}
              category-val="top_rated"
              className={`${
                this.props.category === "top_rated" ? "selectedBtn" : ""
              }`}
            >
              Top Rated
            </Button>
          </div>
          <div className="search">
            <Button variant="text" size="large" startIcon={<SearchIcon />}>
              Search
            </Button>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.discover.category,
  };
};

const ConnectedSideMenu = connect(mapStateToProps)(Header);

export default ConnectedSideMenu;
