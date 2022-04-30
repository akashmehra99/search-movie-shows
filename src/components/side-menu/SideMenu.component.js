import React from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import sideMenu from "./sideMenu.css";

export const SideMenu = () => {

    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <aside>
            <h3>DISCOVER OPTIONS</h3>
            <div className={sideMenu.formConatiner}>
                <FormControl fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>TV Show</MenuItem>
                        <MenuItem value={20}>Movies</MenuItem>
                    </Select>
                </FormControl>
            </div>

        </aside>
    )
}