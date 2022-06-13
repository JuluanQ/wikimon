import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Form, Input, AutoComplete } from 'antd';

import { typesId } from './Type';

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
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');

    const onChange = (data) => {
        setValue(data);
    };

    const handleSearch = (data) => {
        setOptions([])
        if (data.length > 2) {
            //enlever les deux premiers caractères
            let search = replaceSpec(data.substring(2));

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
    const onSelect = (data) => {
        let idsearch = 0
        let types = new Map(Object.entries(typesId))
        let searchEntry = value.substring(2)
        if (value.startsWith("p/")) {
            speciesNameId.forEach((name, id) => {
                let tmp = replaceSpec(name).toLowerCase()
                searchEntry
                if (tmp === data) {
                    idsearch = id
                    return false
                }
            })
            navigate("/pokemon/" + idsearch)
        }
        else if (value.startsWith("t/")) {
            types.forEach((id, name) => {
                if (name === data) {
                    idsearch = id
                    return false
                }
            })
            navigate("/type/" + idsearch)
        }

    };

    const navigate = useNavigate()
    const location = useLocation()
    const speciesNameId = useSelector((state) => state.dataPkmn.speciesNameId.payload)
    const [search, setSearch] = useState("");
    const [possiblites, setPossiblites] = useState([]);
    const [possibilities, setPossibilities] = useState([]);

    const handleSearchOnChange = (event) => {
        var text = event.target.value
        setPossibilities([]);
        setPossiblites([]);
        let valuePossibilities = []
        let types = new Map(Object.entries(typesId))
        setSearchMap(new Map())
        switch (true) {
            case text.startsWith("p/"):
                text = text.substring(2)


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
            case text.startsWith("t/"):
                text = text.substring(2)
                types.forEach((key, value) => {
                    let tmp = replaceSpec(value.toLowerCase())
                    if (tmp.includes(text)) {
                        possibilities.push(key)
                        valuePossibilities.push(tmp)
                        searchMap.set(key, value)
                    }
                });
                setPossiblites(valuePossibilities)
                if (possibilities.length == 1) {
                    setSearch("/type/" + possibilities[0])
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setSearch("")
        setPossiblites([])
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
                            onChange={onChange}
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