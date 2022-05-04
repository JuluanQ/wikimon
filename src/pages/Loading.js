import React from 'react';

import { LoadingOutlined } from '@ant-design/icons'

const Loading = () => {
    return (
        <div id="loadingPage" style={{ display: "block", height: "100%", backgroundColor: "#3d3d3d" }}>
            <LoadingOutlined style={{ fontSize: 50, justifySelf: "center", alignSelf: "center" }} />
        </div>
    );
};

export default Loading;