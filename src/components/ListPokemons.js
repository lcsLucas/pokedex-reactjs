import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import Load from './Load'

const ListaPokemons = styled.div`
position:absolute;
left: 883px;
top: 215px;
width: 278px;
height: 280px;
background: #56B0FD;
border-radius: 15px;

.nav {
    width: 100%;
    height: 100%;
    list-style:none;
    padding: 0;
    margin: 0;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    overflow: hidden;
    padding: .4rem .3rem;

    .nav-item {
        width: 50%;
        flex: 1;
    }

    button {
        width: 100%;
        background: transparent;
        border: none;
        padding: .18rem 1rem;
        text-align:left;
        color: #FFF;
        font-size: .85rem;
        text-transform: capitalize;
        outline: none;
        transition: background-color .1s;

        small {
            font-size: 75%
        }

        &:hover {
            background: #FFF;
            color: #262626
        }

    }
}

.err, .load {
    height: 100%;
    color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .fa-fw {
        width: 1.15em;
        margin-right: .5rem
    }

    p {
        margin: 0
    }

    button {
        background: #FFF;
        border:none;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: .26rem .7rem;
        color: #444;
        margin: .7rem 0 0;
        transition: background-color .5s
    }

}

.list-controls {
    margin: 3rem 0 0;
    text-align: center;

    button {
        padding: .15rem 2rem;
        margin: 0 .25rem;
        font-weight: 700;
        color: #222;

        background: #E6E6E6;
        border-radius: 3px;
        border: 2px solid black;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);

        &:hover {
            background-color: #FFF !important; 
        }

    }

}
`

export default (props) => {

    const [urls, setUrls] = useState({
        cur: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
        prev: '',
        next: ''
    })
    const [listPokemons, setListPokemons] = useState([])
    const [load, setLoad] = useState(true)
    const [err, setErr] = useState({ status: false, msg: 'Erro, ao buscar os pokemons.' })

    const loadPokemons = async () => {        

        try {
            const req_pokemons = await (await fetch(urls.cur)).json()

            if (req_pokemons) {

                setUrls({
                    cur: urls.cur,
                    prev: req_pokemons.previous,
                    next: req_pokemons.next ? req_pokemons.next : null,
                })
                setListPokemons(req_pokemons.results)
            }

            setLoad(false);

        } catch (e) {
            setErr({
                status: true,
                msg: 'Erro, ao buscar os pokemons.'
            })
        }

    }

    useEffect(() => {
        loadPokemons();
    }, [urls.cur])

    function Err({ msg }) {
        return (
            <div className="err">
                <p>{msg}</p>
                <button onClick={loadPokemons}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fa-fw"><path fill="currentColor" d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"></path></svg>
                    Tentar novamente
                </button>
            </div>
        )
    }

    function ListControls({ prev, next }) {
        const changeListPrevious = (e) => {
            e.preventDefault();

            prev && setUrls({
                next: urls.cur,
                cur: prev
            })
        }

        const changeListNext = (e) => {
            e.preventDefault();

            next && setUrls({
                prev: urls.cur,
                cur: next
            })
        }

        return (
            <div className="list-controls">
                <button onClick={changeListPrevious} >PREV</button>
                <button onClick={changeListNext} >NEXT</button>
            </div>
        )
    }

    function PokemonItem({ name, url }) {

        let query = url.slice(0, -1)
        query = query.split("/")
        
        let id = query[query.length - 1];

        return (
            <li className="nav-item">
                <button onClick={() => props.changePokemon(url)}>
                    <small>{`${id}`}</small>{`. ${name}`}
                </button>
            </li>
        )
    }

    return (

        <ListaPokemons className="list-pokemons">
            {
                load && <Load />
            }
            {
                err.status && <Err msg={err.msg} />
            }
            {
                listPokemons.length > 0 &&
                <ul className="nav">
                    {
                        listPokemons.map((item, index) => (
                            <PokemonItem key={index} url={item.url} name={item.name} />
                        ))
                    }
                </ul>
            }
            <ListControls prev={urls.prev} next={urls.next} />
        </ListaPokemons>
    )
}