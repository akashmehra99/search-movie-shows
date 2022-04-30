import React from "react";

import Button from '@mui/material/Button';


import headerCss from "./header.component.css";

export const Header = () => {

    return (
        <React.Fragment>
            <header>
                <div className={headerCss.title}>Discover</div>
                <div className={headerCss.menu}>
                    <Button variant="text" size="large">Popular</Button>
                    <Button variant="text" size="large">Trend</Button>
                    <Button variant="text" size="large">Newest</Button>
                    <Button variant="text" size="large">Top Rated</Button>
                </div>
                <div className={headerCss.search}>
                    <Button variant="text" size="large">Search</Button>
                </div>
            </header>
        </React.Fragment>
    )
}