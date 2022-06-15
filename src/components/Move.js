import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Move = (props) => {

    const navigate = useNavigate()

    const [moveName, setMoveName] = useState()
    const [pp, setPp] = useState()
    const [url, setUrl] = useState() 
    const [moveId, setMoveId] = useState()
    const [effect, setEffect] = useState();

    const handleClickMove = () => {
        if (moveId) {
            navigate("/move/" + moveId);
        }
    }

    useEffect(() => {
        if (props.moveName != undefined && props.pp != undefined && props.url != undefined && props.moveId != undefined && props.effect != undefined) {
            setMoveName(props.moveName)
            setPp(props.pp)
            setUrl(props.url)
            setMoveId(props.moveId)
            setEffect(props.effect)
        }
    }, []);

    return (
        <div className="move hvr-grow" id="onlyMove" onClick={() => handleClickMove()}>
            <div id="first_row_only_move">
                <div class="bold">
                    {moveName}
                </div>
                <div>
                    Pp : {pp}
                </div>
                <div>
                    <img src={url}/>
                </div>
            </div>
            <div>
                {effect}
            </div>
        </div>
    )
}

export default Move;