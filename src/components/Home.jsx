import axios from 'axios'
import React from 'react'
import Card from './Card'
import { Button, Spinner } from '@material-tailwind/react'
import toast from 'react-hot-toast'

const Home = ({ search, currType }) => {

    const [pokemon, setPokemon] = React.useState([])
    const [visiblePokemon, setVisiblePokemon] = React.useState(20);
    const [favourite, setFavourite] = React.useState([]);


    const addToFavourite = (id) => {
        try {
            // Retrieve current favorites from local storage
            const storedArray = JSON.parse(localStorage.getItem('favourite')) || [];

            // Check if the ID is already in favorites
            if (storedArray.includes(id)) {
                toast.error('The Pokemon is already in the favourite', {
                    duration: 3000
                });
            } else {
                const updatedFavourite = [...storedArray, id];
                localStorage.setItem('favourite', JSON.stringify(updatedFavourite));

                toast.success('The Pokemon has been added to favourites', {
                    duration: 3000
                });
            }


        } catch (error) {
            console.error('Error adding favourite to local storage:', error);
        }
    };



    async function getPokemon() {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const { results } = data
            setPokemon(results);
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowMore = () => {
        // Increment the visiblePokemons by 20 when the button is clicked
        setVisiblePokemon(prevVisiblePokemon => prevVisiblePokemon + 20);
    };


    const pokemons = pokemon?.slice(0, visiblePokemon).filter(pokemon => {
        return search === '' ? pokemon : pokemon?.name.toLowerCase().includes(search)
    })?.map((pokemon, idx) => {
        return (
            <Card key={idx} {...pokemon} pokemon={pokemon} addToFavourite={addToFavourite} search={search} currType={currType} />
        )
    })

    React.useEffect(() => {
        getPokemon()
    }, [search])

    const hasResults = pokemons && pokemons.length > 0

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className='pt-[234px] pb-16 min-h-[calc(100vh-58px)] flex justify-center items-center flex-col gap-14'>
                    <div className="container mx-auto px-5 grid xl:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-36">
                        {pokemons}
                    </div>
                    <div className="flex justify-center">
                        {hasResults && <Button onClick={handleShowMore} disabled={visiblePokemon === 1300 || visiblePokemon !== pokemons.length} loading={visiblePokemon !== pokemons.length} variant='gradient'>See More</Button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home