import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd';

import '../assets/css/App.css'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

    const navigate = useNavigate()
    const speciesNameId = useSelector((state) => state.dataPkmn.speciesNameId)
    const [species, setSpecies] = useState();


    function validateSearch(event) {
        var text = event.target.value;
        var what = ""
        if (text.length > 2) {
            what = text.substring(2);
        }

        switch (true) {
            case text.startsWith("p/"):
                console.log("Searching a Pokemon")

                var searchPossibilities = []
                speciesNameId.forEach((key, value) => {
                    if (value.includes(what)) {
                        searchPossibilities.push(key)
                    }
                })
                console.log(searchPossibilities)

                if (event.keyCode == 13 && searchPossibilities.length == 1) {
                    event.target.value = ""
                    navigate("/pokemon/" + what)
                }
                break;

            case text.startsWith("t/"):
                console.log("Searching a Type")
                if (event.keyCode == 13) {
                    event.target.value = ""
                    navigate("/type/" + what)
                }
                break;
            case text.startsWith("m/"):
                console.log("Searching a Move")
                if (event.keyCode == 13) {
                    event.target.value = ""
                    navigate("/move/" + what)
                }
                break;
            case text.startsWith("i/"):
                console.log("Searching an Item")
                if (event.keyCode == 13) {
                    event.target.value = ""
                    navigate("/item/" + what)
                }
                break;
            case text.startsWith("b/"):
                console.log("Searching a Berry")
                if (event.keyCode == 13) {
                    event.target.value = ""
                    navigate("/berry/" + what)
                }
                break;
            case text.startsWith("g/"):
                console.log("Searching a Game")
                if (event.keyCode == 13) {
                    event.target.value = ""
                    navigate("/game/" + what)
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setSpecies(dataSpecies.payload)
    }, [dataSpecies]);

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
                            onKeyDown={validateSearch}
                        />
                    </div>
                </Dropdown>
            </div>
        </div >
    );
};



export default Header;