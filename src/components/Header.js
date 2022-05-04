import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd';

import '../assets/css/App.css'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const style = {
    backgroundColor: "#242424",
    color: "#aaaaaa",
    border: "1px solid #3d3d3d",
    borderRadius: "1em",
}

const homelogoStyle = {
    color: "#aaaaaa",
    fontSize: "2em",
    alignSelf: "center",
    justifySelf: "center",
    display: "block",
    position: "absolute",
    left: "3em",
}
const menu = (
    <Menu style={style} theme="dark"
        items={[
            {
                label: "Try typing p/... or t/... !",
                key: 0,
            }
        ]}
    />
)



const Header = () => {
    return (
        <div className='Header'>
            <div className="headerBar">
                <NavLink to="/" style={{ display: "flex" }}>
                    <HomeOutlined className='homeLogo' style={homelogoStyle} />
                </NavLink>

                <Dropdown overlay={menu} trigger={['click']} overlayStyle={style}>
                    <div className="searchBar">
                        <SearchOutlined className='searchLogo' />
                        <input type="search"
                            id='searchInput'
                            className='searchBarInput'
                            placeholder='Search on Wikimon'
                        />
                    </div>
                </Dropdown>
            </div>
        </div >
    );
};

function validateSearch() {
    var searchInput = document.getElementById("searchInput")
    var text = searchInput.value;
    var what = ""
    if (text.length > 2) {
        what = text.substring(2);
    }

    switch (true) {
        case text.startsWith("p/"):
            console.log("Searching a Pokemon")
            return "/pokemon/2"

        case text.startsWith("t/"):
            console.log("Searching a Type")
            break;
        case text.startsWith("m/"):
            console.log("Searching a Move")
            break;
        case text.startsWith("i/"):
            console.log("Searching an Item")
            break;
        case text.startsWith("b/"):
            console.log("Searching a Berry")
            break;
        case text.startsWith("g/"):
            console.log("Searching a Game")
            break;
        default:
            break;
    }
}

export default Header;