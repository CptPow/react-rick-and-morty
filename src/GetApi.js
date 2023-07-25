import React, { useState, useEffect } from "react";
import style from "./css/style.css"

const GetApi = ()=> {
    const url = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6";
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCards = async ()=> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error (`Richiesta non avvenuta ${response.status}`)
            }
            const data = await response.json();
            setCard(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    useEffect(()=>{
        getCards();
    }, []);
    if (loading) {
        return <Loading />
    }
if (error) {
    return <Error />
}
return (
    <React.Fragment>
{card.map(({name, image, species, gender}) => {
    return (
        <div className="card">
        <h3>{name}</h3>
        <img src={image} alt="Rick and Morty"></img>
        <h4>Species: {species}</h4>
        <p>Gender: {gender}</p>
        </div>
    )
})}
    </React.Fragment>
)
}

const Loading = ()=> {
    return <h2>Loading...</h2>
}

const Error = ()=> {
    return <h2>Error 404...</h2>
}

export default GetApi