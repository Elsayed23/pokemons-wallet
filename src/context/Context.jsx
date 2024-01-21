import React, { createContext } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'


export const MyContext = createContext()


const ContextProvider = ({ children }) => {

    const [pokemon, setPokemon] = React.useState([])
    const [search, setSearch] = React.useState('')
    const [currType, setCurrType] = React.useState('all')
    const [favourite, setFavourite] = React.useState([]);

    async function getPokemon() {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const { results } = data
            setPokemon(results);
        } catch (error) {
            console.log(error);
        }
    }

    const addToFavourite = (id) => {
        try {
            // Retrieve current favorites from local storage
            const storedArray = JSON.parse(localStorage.getItem('favourite')) || [];

            // Check if the ID is already in favorites

            const updatedFavourite = [...storedArray, id];
            localStorage.setItem('favourite', JSON.stringify(updatedFavourite));

            toast.success('The Pokemon has been added to favourites', {
                duration: 3000
            });


        } catch (error) {
            console.error('Error adding favourite to local storage:', error);
        }
    };

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


    return (
        <MyContext.Provider value={{
            search, setSearch, currType, setCurrType, favourite, setFavourite, addToFavourite, removeFromFavourite, pokemon, getPokemon
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider