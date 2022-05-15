import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import "./header.component.css";

import {
  setCategory,
  resetResults,
  setSearchParam,
} from "../../actions/discover";
import { debounce } from "../../util/debounce";

class Header extends Component {
  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.showSearchInput = this.showSearchInput.bind(this);
    this.getSearchValue = debounce(this.getSearchValue.bind(this), 500);
    this.state = {
      showSearchInputField: false,
    };
  }

  selectCategory(event) {
    const category = event.currentTarget.getAttribute("category-val");
    this.props.dispatch(resetResults());
    this.props.dispatch(setSearchParam(""));
    this.props.dispatch(setCategory(category));
  }

  showSearchInput() {
    this.props.dispatch(setCategory("search"));
    this.setState({ showSearchInputField: !this.state.showSearchInputField });
  }

  getSearchValue(event) {
    const searchParam = event?.target?.value && event.target.value.trim();
    if (searchParam) {
      this.props.dispatch(resetResults());
      this.props.dispatch(setSearchParam(searchParam));
    }
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
            {this.state.showSearchInputField && (
              <TextField
                id="search-content"
                label="SEARCH"
                variant="outlined"
                onChange={this.getSearchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {!this.state.showSearchInputField && (
              <Button
                variant="text"
                onClick={this.showSearchInput}
                size="large"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            )}
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.discover.category,
    searchParam: state.discover.searchParam,
  };
};

const ConnectedSideMenu = connect(mapStateToProps)(Header);

export default ConnectedSideMenu;
