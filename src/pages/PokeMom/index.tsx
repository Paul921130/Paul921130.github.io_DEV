import React from 'react';
import logo from './logo.svg';
import './App.scss';

function PokemonDetail() {
    const Version_ID = [
        [0, 151],
        [151, 386],
        [386, 469],
    ];

    const [version, changeVersion] = React.useState<number>(1);
    const [pokemons, changePokemons] = React.useState<any[]>([]);
    const fetch_ditto = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error('Error:', error))
            .then((response) => console.log('Success:', response));
    };

    const fetch_limit = () => {
        try {
            //https://pokeapi.co/api/v2/pokemon?limit=100&offset=200
            let limit = Version_ID[version - 1][1] - Version_ID[version - 1][0];
            let offset = Version_ID[version - 1][0];
            fetch('https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset, {
                method: 'GET', // or 'PUT'
                // body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('limit', data.results);
                    if (data?.results) {
                        changePokemons(data.results);
                    }
                    // console.log(data);
                })
                .catch((error) => console.error('Error:', error))
                .then((response) => console.log('Success:', response));
        } catch (e) {
            // 用於處理例外的陳述式
            console.log(e); // 將例外物件傳給 error handler
        }
    };

    const mappingPokemonItem = () => {
        let a;
        try {
            a = pokemons.map((ele, index) => {
                let id = ele.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
                return (
                    <li key={`${ele.name}`}>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        />
                        <p>{ele.name}</p>
                    </li>
                );
            });
            // for (
            //     let index = Version_ID[version - 1][0];
            //     index < Version_ID[version - 1][1];
            //     index++
            // ) {
            //     a.push(
            //         <li>
            //             <img
            //                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
            //             />
            //         </li>
            //     );
            // }
        } catch (e) {
            // 用於處理例外的陳述式
            console.log('東東出不來'); // 將例外物件傳給 error handler
        }

        return a || [];
    };

    React.useEffect(() => {
        fetch_ditto();
        fetch_limit();
    }, []);

    React.useEffect(() => {
        fetch_limit();
    }, [version]);

    return (
        <div className="App">
            <ul className="pokemon_vesions">
                <li
                    onClick={() => {
                        changeVersion(1);
                    }}
                >
                    第1世代
                </li>
                <li
                    onClick={() => {
                        changeVersion(2);
                    }}
                >
                    第2世代
                </li>
                <li
                    onClick={() => {
                        changeVersion(3);
                    }}
                >
                    第3世代
                </li>
                <li
                    onClick={() => {
                        changeVersion(4);
                    }}
                >
                    第4世代
                </li>
                <li
                    onClick={() => {
                        changeVersion(5);
                    }}
                >
                    第5世代
                </li>
            </ul>
            <ul className="pokemon_list">{mappingPokemonItem()}</ul>
        </div>
    );
}

export default PokemonDetail;
