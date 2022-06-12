import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Form, Input, AutoComplete } from 'antd';

import '../assets/css/App.css'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setOptions([])
        if (value.length > 2) {
            //enlever les deux premiers caractères
            let search = replaceSpec(value.substring(2));

            //setOptions pour afficher les résultats de possibilités
            let values = []
            possiblites.forEach((possibilité) => {
                if (possibilité != undefined) {
                    if (values.length < 5) {
                        values.push({ value: possibilité })
                    }
                }
            })
            setOptions(
                !value ? [] : values
            )

        }
    }
    const onSelect = (value) => {
        let idsearch = 1
        speciesNameId.forEach((name, id) => {
            let tmp = replaceSpec(name).toLowerCase()
            if (tmp == value) {
                idsearch = id
                //quitter la boucle
                return false
            }
        })
        navigate("/pokemon/" + idsearch)
    };

    const navigate = useNavigate()
    const location = useLocation()
    const speciesNameId = useSelector((state) => state.dataPkmn.speciesNameId.payload)
    const [search, setSearch] = useState("");
    const [possiblites, setPossiblites] = useState();

    const handleSearchOnChange = (event) => {
        var text = event.target.value
        setSearchMap(new Map())
        switch (true) {
            case text.startsWith("p/"):
                text = text.substring(2)
                let possibilities = []
                let valuePossibilities = []
                speciesNameId.forEach((value, key) => {
                    let tmp = replaceSpec(value.toLowerCase())
                    if (tmp.includes(text)) {
                        possibilities.push(key)
                        valuePossibilities.push(tmp)
                        searchMap.set(key, value)
                    }
                });
                setPossiblites(valuePossibilities)
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
    }, [location]);


    return (
        <div className='Header'>
            <div className="headerBar">
                <NavLink to="/" style={{ display: "flex" }}>
                    <HomeOutlined className='homeLogo' style={homelogoStyle} />
                </NavLink>
                <div className="searchBar">
                    <SearchOutlined className='searchLogo' />
                    <form onSubmit={() => { navigate(search); }} action="javascript:void(0);">
                        <AutoComplete
                            style={{ color: "#fff" }}
                            dropdownClassName="autoCompletePkmn"
                            options={options}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                        >
                            <Input type="search"
                                id='searchInput'
                                className='searchBarInput'
                                placeholder='Search on Wikimon'
                                onChange={handleSearchOnChange}
                            />
                        </AutoComplete>
                    </form>

                </div>
            </div>
        </div >
    );
};



export default Header;