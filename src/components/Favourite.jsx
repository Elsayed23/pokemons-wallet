import Card from './Card';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const Favourite = ({ search, currType }) => {

    const [pokemon, setPokemon] = React.useState([])

    const [favourite, setFavourite] = React.useState([]);


    React.useEffect(() => {
        try {
            const storedArray = JSON.parse(localStorage.getItem('favourite')) || [];
            setFavourite(storedArray);
        } catch (error) {
            console.error('Error loading data from local storage:', error);
        }
    }, []);

    async function getPokemon() {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const { results } = data
            setPokemon(results);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getPokemon()
    }, [search])

    console.log(favourite);

    const getLastNumberFromUrl = (url) => {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 2]; // Using length - 2 to get the last part before the trailing slash
        return parseInt(lastPart, 10);
    };


    const test = favourite?.map(favNum => {
        return pokemon.filter(apiNum => {
            return getLastNumberFromUrl(apiNum.url) === favNum
        })
    }).map(url => {
        return url[0]
    })

    const removeFromFavourite = (id) => {
        try {
            const storedArray = JSON.parse(localStorage.getItem('favourite')) || [];

            // Remove the specified ID from the array
            const updatedFavourite = storedArray.filter(lID => {
                return id !== lID
            });

            // Update the local storage with the modified array
            localStorage.setItem('favourite', JSON.stringify(updatedFavourite));

            setFavourite(updatedFavourite);
            toast.success('The Pokemon has removed from favourite', {
                duration: 3000
            })
        } catch (error) {
            console.error('Error removing favourite from local storage:', error);
        }
    };



    const pokemons = test?.filter(pokemon => {
        return search === '' ? pokemon : pokemon?.name.toLowerCase().includes(search)
    })?.map((pokemon, idx) => {
        return (
            <Card key={idx} {...pokemon} pokemon={pokemon} removeFromFavourite={removeFromFavourite} search={search} currType={currType} />
        )
    })

    const hasResults = pokemons && pokemons.length > 0


    return (
        <div className="pt-44 flex flex-col items-center">
            {hasResults && <h1 className='text-3xl md:text-5xl font-bold text-center '>Your Favourite Pokemons</h1>}
            <div className='py-24 min-h-[calc(100vh-234px)] flex justify-center items-center flex-col gap-14'>
                {
                    hasResults
                        ?
                        <>
                            <div className="container mx-auto px-5 grid xl:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-36">
                                {pokemons}
                            </div>
                        </>
                        :
                        <h1 className='text-3xl text-center'>You are not have any pokemon in favourite</h1>
                }
            </div>
        </div>
    )
}

export default Favourite