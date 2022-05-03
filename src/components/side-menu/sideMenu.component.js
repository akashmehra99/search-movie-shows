import React, { Component } from "react";
import { connect } from "react-redux";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import sideMenu from "./sideMenu.css";

import { discoverAPI } from "../../api/discover.api";
import { setGenres } from "../../actions/discover";

const discoverApi = discoverAPI();

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'movie',
            genre: props.genre || '',
        };
    }

    componentDidMount() {
        discoverApi.getGenres()
            .then((genres) => {
                this.props.dispatch(setGenres(genres));
            });
    }

    handleTypeChange = (event) => {
        const type = event.target.value;
        this.setState(() => ({ type }));
    }

    handleGenreChange = (event) => {
        const genre = event.target.value;
        this.setState(() => ({ genre }));
    }

    render() {
        return (
            <aside>
                <h3>DISCOVER OPTIONS</h3>
                <div className={sideMenu.formConatiner}>
                    <FormControl fullWidth className={sideMenu.formMargin}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type-select"
                            value={this.state.type}
                            label="Type"
                            onChange={this.handleTypeChange}
                        >
                            <MenuItem key='movie-option' value={'movie'}>Movie</MenuItem>
                            <MenuItem key='tv-option' value={'tv'}>TV</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className={sideMenu.formMargin}>
                        <InputLabel id="genre-label">Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre-select"
                            value={this.state.genre}
                            label="Genre"
                            onChange={this.handleGenreChange}
                        >
                            {this.props.genres && this.props.genres.length && this.props.genres.map((genre) => <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.discover.genres
    }
}

const ConnectedSideMenu = connect(mapStateToProps)(SideMenu);

export default ConnectedSideMenu;