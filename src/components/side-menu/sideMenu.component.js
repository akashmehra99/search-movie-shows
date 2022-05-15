import React, { Component } from "react";
import { connect } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import "./sideMenu.component.css";

import { discoverAPI } from "../../api/discover.api";
import {
  setGenre,
  setGenres,
  setType,
  resetResults,
  setRating,
  setYear
} from "../../actions/discover";
import { debounce } from "../../util/debounce";


const discoverApi = discoverAPI();

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleRatingChange = debounce(this.handleRatingChange.bind(this), 200);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.years = this.generateYears();
  }

  componentDidMount() {
    discoverApi.getGenres().then((genres) => {
      this.props.dispatch(setGenres(genres));
    });
  }

  generateYears(startYear = 1950) {
    let currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i >= startYear; i--) {
      years.push(i);
    }
    return years;
  }

  handleTypeChange = (event) => {
    const contentType = event.target.value;
    this.props.dispatch(resetResults());
    this.props.dispatch(setType(contentType));
  };

  handleGenreChange = (event) => {
    const genre = event.target.value;
    this.props.dispatch(resetResults());
    this.props.dispatch(setGenre(genre));
  };

  handleRatingChange = (event, newValue) => {
    this.props.dispatch(resetResults());
    this.props.dispatch(setRating(newValue));
  };

  handleYearChange = (event) => {
    const year = event.target.value;
    this.props.dispatch(resetResults());
    this.props.dispatch(setYear(year));
  };

  render() {
    return (
      <aside>
        <h3>DISCOVER OPTIONS</h3>
        <div className="formConatiner">
          <FormControl fullWidth className="formMargin">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              value={this.props.contentType}
              label="Type"
              onChange={this.handleTypeChange}
            >
              <MenuItem key="movie-option" value={"movie"}>
                Movie
              </MenuItem>
              <MenuItem key="tv-option" value={"tv"}>
                TV
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="formMargin">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={this.props.genre}
              label="Genre"
              onChange={this.handleGenreChange}
            >
              {this.props.genres &&
                this.props.genres.length &&
                this.props.genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="formMargin">
            <InputLabel id="year-label">Select Year</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={this.props.year}
              label="Select Year"
              onChange={this.handleYearChange}
            >
              <MenuItem key={"year_default"} value="">
                Select Year
              </MenuItem>
              {this.years &&
                this.years.length &&
                this.years.map((year) => (
                  <MenuItem key={`year_${year}`} value={year}>
                    {year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="formMargin">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              defaultValue={2.5}
              precision={0.25}
              value={this.props.rating}
              onChange={this.handleRatingChange}
            />
          </FormControl>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.discover.genres,
    genre: state.discover.genre,
    contentType: state.discover.contentType,
    rating: state.discover.rating,
    year: state.discover.year,
  };
};

const ConnectedSideMenu = connect(mapStateToProps)(SideMenu);

export default ConnectedSideMenu;
