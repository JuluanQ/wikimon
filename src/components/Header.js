import React from 'react';
import 'antd/dist/antd.css'
import SearchOutlined from '@ant-design/icons'

const Header = () => {
    return (
        <div className='Header'>
            <div className="headerBar">
                <div className="searchBar">
                    <SearchOutlined className='searchLogo'/>
                    
                    <input type="search"
                        className='searchBarInput'
                        placeholder='Search on Wikimon' />
                </div>

            </div>
        </div>
    );
};

export default Header;