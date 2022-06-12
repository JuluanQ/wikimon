import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, notification } from 'antd';

import '../assets/css/App.css'
import { Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

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



/*
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
*/

/* Permet de rechercher sans les accents */
const rules = {
    a: "àáâãäå",
    A: "ÀÁÂ",
    e: "èéêë",
    E: "ÈÉÊË",
    i: "ìíîï",
    I: "ÌÍÎÏ",
    o: "òóôõöø",
    O: "ÒÓÔÕÖØ",
    u: "ùúûü",
    U: "ÙÚÛÜ",
    y: "ÿ",
    c: "ç",
    C: "Ç",
    n: "ñ",
    N: "Ñ"
};
function getJSONKey(key) {
    for (let acc in rules) {
        if (rules[acc].indexOf(key) > -1) { return acc }
    }
}
function replaceSpec(Texte) {
    let regstring = ""
    for (let acc in rules) {
        regstring += rules[acc]
    }
    let reg = new RegExp("[" + regstring + "]", "g")
    return Texte.replace(reg, function (t) { return getJSONKey(t) });
}

const Header = () => {

    /* search dropdown build */
    const [searchMap, setSearchMap] = useState(new Map());

    const menus = Object.entries(searchMap).map((key) => {
        return (<Menu.Item key={key[0]} icon={<UserOutlined />}>{key[1].name}</Menu.Item>)
    });
    const menu = () => {
        return (<Menu onClick={handleMenuClick}>{menus}</Menu>)
    }
    const handleMenuClick = () => {
    }

    const navigate = useNavigate()
    const location = useLocation()
    const speciesNameId = useSelector((state) => state.dataPkmn.speciesNameId.payload)
    const [species, setSpecies] = useState();
    const [search, setSearch] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleSearchOnChange = (event) => {
        var text = event.target.value
        setSearchMap(new Map())
        switch (true) {
            case text.startsWith("p/"):
                text = text.substring(2)
                let possibilities = []
                speciesNameId.forEach((value, key) => {
                    let tmp = replaceSpec(value.toLowerCase())
                    if (tmp.includes(text)) {
                        possibilities.push(key)
                        searchMap.set(key, value)
                    }
                });
                console.log(searchMap)
                if (possibilities.length == 1) {
                    setSearch("/pokemon/" + possibilities[0])
                }
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        setSearch("")
        document.getElementById("searchInput").value = ""
    }, [location]);


    return (
        <div className='Header'>
            <div className="headerBar">
                <NavLink to="/" style={{ display: "flex" }}>
                    <HomeOutlined className='homeLogo' style={homelogoStyle} />
                </NavLink>

                <Dropdown overlay={menu} trigger={['click']} overlayStyle={style}>
                    <div className="searchBar">
                        <SearchOutlined className='searchLogo' />
                        <form onSubmit={() => { navigate(search) }} autoComplete="off" action="javascript:void(0);">
                            <input type="search"
                                id='searchInput'
                                className='searchBarInput'
                                placeholder='Search on Wikimon'
                                onChange={handleSearchOnChange}
                            />
                        </form>

                    </div>
                </Dropdown>
            </div>
        </div >
    );
};



export default Header;