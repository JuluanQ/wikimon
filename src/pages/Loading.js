import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

import { LoadingOutlined } from '@ant-design/icons'

const Loading = (props) => {
    return (
        <div id="loadingPage" style={{ display: "flex", height: "100%", backgroundColor: "#3d3d3d", justifyContent: "center", alignSelf: "center" }}>
            <div>
                <div style={{ display: "flex", justifySelf: "center", alignSelf: "center" }}>
                    <h1 style={{ color: "#aaaaaa", margin: "2em" }}>Fetching all data ...</h1>
                </div>

                <br />
                <div style={{ display: "block", width: "100%", justifySelf: "center", alignSelf: "center" }}>
                    <ProgressBar striped animated now={props.progress} style={{ justifySelf: "center", alignSelf: "center" }} />
                </div>
            </div>

        </div >

    );
};

export default Loading;