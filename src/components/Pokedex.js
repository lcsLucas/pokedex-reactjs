import React from 'react'
import styled from 'styled-components'

import DetailsPokemon from './DetailsPokemon'
import ListPokemons from './ListPokemons'

import bgPokedex from '../img/bg-pokedex.png'

const Pokedex = styled.div`
    background: #FFF;
    width: 100%;
    max-width: 818px;
    height: 521px;
    background: url(${ bgPokedex });
    background-size: 100% 100%
`

export default () => {
    return (
        <Pokedex className="pokedex">
            <DetailsPokemon />
            <ListPokemons />
        </Pokedex>
    )
}