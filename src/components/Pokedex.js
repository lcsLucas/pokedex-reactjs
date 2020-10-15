import React, { useState } from 'react'
import styled from 'styled-components'

import DetailsPokemon from './DetailsPokemon'
import ListPokemons from './ListPokemons'

import bgPokedex from '../img/bg-pokedex.png'

const Pokedex = styled.div`
    background: #FFF;
    width: 100%;
    max-width: 818px;
    height: 521px;
    background: url(${bgPokedex});
    background-size: 100% 100%
`

export default () => {

    const [pokemon, setPokemon] = useState(null)

    const changePokemon = async (url_pokemon) => {
        console.log(url_pokemon);
        const req_pokemons = await (await fetch(url_pokemon)).json()

        setPokemon(req_pokemons)
    }

    return (
        <Pokedex className="pokedex">
            <DetailsPokemon pokemon={pokemon} />
            <ListPokemons changePokemon={changePokemon} />
        </Pokedex>
    )
}