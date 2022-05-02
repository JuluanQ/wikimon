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
                label: "Try typing p/... or u/... !",
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
                            placeholder='Search on Wikimon' />
                    </div>
                </Dropdown>
            </div>
        </div >
    );
};

export default Header;