import React from 'react'
import { useEffect, useState } from 'react'

function Characters() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCharacters()
    },[])

    const fetchCharacters = async () => {
        const response = await fetch(`https://rickandmortyapi.com/api/character`)

        const data = await response.json()
        setCharacters(data.results)
        setLoading(false)
    }

    if (!loading) {

  return (
    <div>{
        characters.map((character) => 
            <h3 key={character.id}>{character.name}</h3>
        )
        }</div>
  )
} else {
    return (

        <h3>Loading...</h3>
        )
}

}

export default Characters