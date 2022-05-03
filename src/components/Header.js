import React from 'react';
import 'antd/dist/antd.css'
import { SearchOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd';
const style = {
    backgroundColor: "#242424",
    color: "#aaaaaa",
    border: "1px solid #3d3d3d",
    borderRadius: "1em",
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
                <Dropdown overlay={menu} trigger={['click']} overlayStyle={style}>
                    <div className="searchBar">
                        <SearchOutlined className='searchLogo' />
                        <input type="search"
                            className='searchBarInput'
                            placeholder='Search on Wikimon'
                            onChange={search} />
                    </div>
                </Dropdown>
            </div>
        </div >
    );
};

function search(textInput) {
    var text = textInput.target.value
    switch (text) {
        case "p/":
            console.log("Searching a Pokemon")
            break;
        case "t/":
            console.log("Searching a Type")
            break;
        case "m/":
            console.log("Searching a Move")
            break;
        case "i/":
            console.log("Searching an Item")
            break;
        case "b/":
            console.log("Searching a Berry")
            break;
        case "g/":
            console.log("Searching a Game")
            break;
        default:
            break;
    }
}

export default Header;