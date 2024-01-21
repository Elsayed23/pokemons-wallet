import React, { useContext } from 'react'
import Card from './Card'
import { Button } from '@material-tailwind/react'
import { MyContext } from '../context/Context'

const Home = () => {

    const [visiblePokemon, setVisiblePokemon] = React.useState(20);

    const { search, pokemon, getPokemon } = useContext(MyContext)


    const handleShowMore = () => {
        // Increment the visiblePokemons by 20 when the button is clicked
        setVisiblePokemon(prevVisiblePokemon => prevVisiblePokemon + 20);
    };


    const pokemons = pokemon?.slice(0, visiblePokemon).filter(pokemon => {
        return search === '' ? pokemon : pokemon?.name.toLowerCase().includes(search)
    })?.map((pokemon, idx) => {
        return (
            <Card key={idx} {...pokemon} pokemon={pokemon} />
        )
    })

    React.useEffect(() => {
        getPokemon()
    }, [search])

    const hasResults = pokemons && pokemons.length > 0

    return (
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
    )
}

export default Home