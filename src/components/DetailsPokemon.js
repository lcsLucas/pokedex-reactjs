import React from 'react'

import styled from 'styled-components'

const DetailsPokemon = styled.div`
position: absolute;
left: 464px;
top: 243px;
width: 278px;
height: 249px;
background: #56B0FD;
border-radius: 15px;
padding: .6rem .9rem;

  &.flying {
    background: #78a2ff;
  }
  
  &.poison {
    background: #a95ca0;
  }
  
  &.ground {
    background: #eecc55;
  }
  
  &.rock {
    background: #ccbd72;
  }
  
  &.bug {
    background: #c2d21e;
  }
  
  &.ghost {
    background: #7975d7;
  }
  
  &.steel {
    background: #c4c2db;
  }
  
  &.fire {
    background: #fa5643;
  }
  
  &.water {
    background: #56adff;
  }
  
  &.grass {
    background: #8cd750;
  }
  
  &.electric {
    background: #fde139;
  }
  
  &.psychic {
    background: #fa65b4;
  }
  
  &.ice {
    background: #96f1ff;
  }
  
  &.dragon {
    background: #8673ff;
  }
  
  &.dark {
    background: #8d6855;
  }
  
  &.fairy {
    background: #f9aeff;
  }

.header {
    display:flex;
    justify-content: space-between;
    align-items: center;

    .name {
        text-transform: capitalize;
        color: white;
        font-size: 25px;
        font-weight: bold;
    }

    .id {
        color: rgba(0, 0, 0, 0.5);
        font-size: 20px;
    }

}

.images {
    display: flex;
    justify-content: space-around
}

.img-fluid {
    max-width: 100%;
    display:block;
}

.info {
    display: flex;
    height: 100px;
    justify-content: space-around;
}

.tipos {
    height: 100%;
    padding: 5px;

    span {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 25px;
        display: block;
        margin-bottom: 10px;
        padding: 10px;
        text-align: center;
    }
}

.stats {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 20px 15px;

    p {
        margin: 0
    }

}
`

function HeaderPokemon({ name, id }) {
    return (
        <div className="header">
            <span className="name">{name}</span>
            <span className="id">#{id}</span>
        </div>
    )
}

function ImagesPokemon({ front, back }) {
    return (
        <div className="images">
            <img src={front} className="img-fluid" />
            <img src={back} className="img-fluid" />
        </div>
    )
}

function InfoPokemon({ weight, height, types }) {

    return (
        <div className="info">
            <div className="tipos">
                {
                    types.map((item) => <span key={item.type.name} >{item.type.name}</span>)
                }
            </div>
            <div className="stats">
                <p>weight: {weight / 10} kg</p>
                <p>height: {height * 10} cm</p>
            </div>
        </div>
    )
}

export default ({ pokemon }) => {

    console.log(pokemon);

    return (
        pokemon &&
        <DetailsPokemon className={`details-pokemon ${pokemon.types[0].type.name}`}>
            <HeaderPokemon name={pokemon.name} id={pokemon.id} />
            <ImagesPokemon front={pokemon.sprites.front_default} back={pokemon.sprites.back_default} />
            <InfoPokemon types={pokemon.types} weight={pokemon.weight} height={pokemon.height} />
        </DetailsPokemon>
    )
}