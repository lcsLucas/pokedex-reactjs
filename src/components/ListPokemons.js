import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

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

    button {
        width: 100%;
        background: transparent;
        border: none;
        padding: .25rem 1rem;
        text-align:left;
        color: #FFF;
        font-size: .85rem;
        font-weight: bold;
        text-transform: capitalize;
        outline: none;
        transition: background-color .1s;

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

        &:hover {
            border-color: transparent !important;
            background-color: #DDD !important; 
        }

    }

}
`

function PokemonItem({ id, name }) {
    return (
        <li className="nav-item">
            <button>
                {`${id}. ${name}`}
            </button>
        </li>
    )
}

function Load() {
    return (
        <div className="load">
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default () => {

    const [offset, setOffset] = useState(0)

    const [urls, setUrls] = useState({
        cur: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
        prev: '',
        next: ''
    })
    const [listPokemons, setListPokemons] = useState([])
    const [load, setLoad] = useState(true)
    const [err, setErr] = useState({ status: false, msg: 'Erro, ao buscar os pokemons.' })

    const loadPokemons = async () => {
        setLoad(false);

        try {
            const req_pokemons = await (await fetch(urls.cur)).json()

            if (req_pokemons) {

                let query = urls.cur.split('offset=')
                query = query[1] ? query[1] : ''
                setOffset(+query.split('&')[0])

                setUrls({
                    cur: urls.cur,
                    prev: req_pokemons.previous,
                    next: req_pokemons.next ? req_pokemons.next : null,
                })
                setListPokemons(req_pokemons.results)
            }

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
                            <PokemonItem key={index} id={index + offset + 1} url={item.url} name={item.name} />
                        ))
                    }
                </ul>
            }
            <ListControls prev={urls.prev} next={urls.next} />
        </ListaPokemons>
    )
}