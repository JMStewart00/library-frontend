import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'https://8000-jmstewart00-djangodemo-bg99z70zajk.ws-us93.gitpod.io/api'

function App() {
    const [genres, setGenres] = useState([]);
    const inputRef = useRef('');

    useEffect(() => {
        const getGenres = async () => {
            let config = {
                url: '/genres/',
                baseURL: BASE_URL,
                method: 'get',
            }
            let response = await axios.request(config);
            setGenres(response.data);
        }

        getGenres();
    }, [])

    async function addGenre() {
        let config = {
            url: '/genres/',
            baseURL: BASE_URL,
            method: 'post',
            data: {
                name: inputRef.current.value
            },
        }
        let response = await axios.request(config);
        setGenres([
            ...genres,
            response.data,
        ])
    }

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={addGenre}>Add Genre</button>
            {genres.map((g) => <h3>{g.name}</h3>)}
        </div>
    )
}

export default App