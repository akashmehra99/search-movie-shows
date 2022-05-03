import React, { Component } from "react";
import { connect } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./sideMenu.component.css";

import { discoverAPI } from "../../api/discover.api";
import { setGenre, setGenres, setType } from "../../actions/discover";

const discoverApi = discoverAPI();

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    discoverApi.getGenres().then((genres) => {
      this.props.dispatch(setGenres(genres));
      // this.props.dispatch(setGenre(genres[0].name));
    });
  }

  handleTypeChange = (event) => {
    const contentType = event.target.value;
    this.props.dispatch(setType(contentType));
  };

  handleGenreChange = (event) => {
    const genre = event.target.value;
    this.props.dispatch(setGenre(genre));
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
                  <MenuItem key={genre.id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
            </Select>
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
  };
};

const ConnectedSideMenu = connect(mapStateToProps)(SideMenu);

export default ConnectedSideMenu;
