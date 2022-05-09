import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const typesUrl = {
    "steel": "https://www.pokepedia.fr/images/b/b9/Miniature_Type_Acier_EB.png",
    "fighting": "https://www.pokepedia.fr/images/1/1c/Miniature_Type_Combat_EB.png",
    "dragon": "https://www.pokepedia.fr/images/2/23/Miniature_Type_Dragon_EB.png",
    "water": "https://www.pokepedia.fr/images/4/4c/Miniature_Type_Eau_EB.png",
    "fire": "https://www.pokepedia.fr/images/f/fc/Miniature_Type_Feu_EB.png",
    "fairy": "https://www.pokepedia.fr/images/3/3e/Miniature_Type_Fée_EB.png",
    "ice": "https://www.pokepedia.fr/images/7/7e/Miniature_Type_Glace_EB.png",
    "bug": "https://www.pokepedia.fr/images/e/ee/Miniature_Type_Insecte_EB.png",
    "normal": "https://www.pokepedia.fr/images/2/2e/Miniature_Type_Normal_EB.png",
    "grass": "https://www.pokepedia.fr/images/3/35/Miniature_Type_Plante_EB.png",
    "poison": "https://www.pokepedia.fr/images/2/28/Miniature_Type_Poison_EB.png",
    "psychic": "https://www.pokepedia.fr/images/d/da/Miniature_Type_Psy_EB.png",
    "rock": "https://www.pokepedia.fr/images/d/d3/Miniature_Type_Roche_EB.png",
    "ground": "https://www.pokepedia.fr/images/d/d6/Miniature_Type_Sol_EB.png",
    "ghost": "https://www.pokepedia.fr/images/e/e5/Miniature_Type_Spectre_EB.png",
    "dark": "https://www.pokepedia.fr/images/f/f4/Miniature_Type_Ténèbres_EB.png",
    "flying": "https://www.pokepedia.fr/images/6/62/Miniature_Type_Vol_EB.png",
    "electric": "https://www.pokepedia.fr/images/6/6c/Miniature_Type_Électrik_EB.png"
};

export const typesId = {
    "steel": 9,
    "fighting": 2,
    "dragon": 16,
    "water": 11,
    "fire": 10,
    "fairy": 18,
    "ice": 15,
    "bug": 7,
    "normal": 1,
    "grass": 12,
    "poison": 4,
    "psychic": 14,
    "rock": 6,
    "ground": 5,
    "ghost": 8,
    "dark": 17,
    "flying": 3,
    "electric": 13
};

const Type = (props) => {

    const navigate = useNavigate()

    const [type, setType] = useState(String);
    const [typeId, setTypeId] = useState();

    const handleClickType = () => {
        if (typeId) {
            navigate("/type/" + typeId);
        }
    }

    useEffect(() => {
        if (props.type != undefined) {
            setType(typesUrl[props.type])
            setTypeId(typesId[props.type])
        }
    }, []);

    //TODO
    return (
        <div className="typeImg hvr-grow" style={{ cursor: 'pointer' }}>
            <img src={type} alt={props.type} onClick={() => handleClickType()} />
        </div>
    );
};
export default Type;