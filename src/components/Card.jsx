import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Chip, IconButton, Progress, Spinner, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React from 'react'
import { Route, useLocation } from 'react-router-dom'
import Loading from './Loading'


const Card = ({ pokemon: { url }, search, currType, addToFavourite, removeFromFavourite }) => {

  const [pokeDetails, setPokeDetails] = React.useState(null)
  const [isFavourite, setIsFavourite] = React.useState(false)

  const isFavoritePokemon = JSON.parse(localStorage.getItem('favourite'))?.includes(pokeDetails?.id) || isFavourite

  async function details() {
    try {
      const { data } = await axios.get(url)
      setPokeDetails(data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    details()
  }, [search, removeFromFavourite])

  const { pathname } = useLocation()
  console.log(isFavourite);
  const isFavouritePage = pathname === '/favourite'

  const colors = [
    {
      text: 'hp',
      color: 'green'
    },
    {
      text: 'attack',
      color: 'red'
    },
    {
      text: 'defense',
      color: 'purple'
    },
    {
      text: 'special-attack',
      color: 'deep-orange'
    },
    {
      text: 'special-defense',
      color: 'deep-purple'
    },
    {
      text: 'speed',
      color: 'teal'
    }
  ]


  const filterByType = pokeDetails?.types.filter(type => {
    return type.type.name === currType || currType === 'all'
  })[0]


  function setColor(text) {
    let color = colors.map(bar => {
      return text === bar.text && bar.color
    }).filter(e => {
      return typeof e === 'string'
    })
    return color[0]
  }

  return (
    pokeDetails && pokeDetails?.sprites.other["official-artwork"]?.front_default
      ?
      filterByType
      &&
      <div className='dropShadow rounded-lg relative duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-7'>
        <div className="mx-auto max-w-96">
          <img src={pokeDetails.sprites.other["official-artwork"]?.front_default} loading='lazy' alt="pokemon" className='w-full pokemonImg duration-300' />
        </div>
        <div className="p-4">
          <h2 className='text-[#2f3a49] text-xl text-center capitalize mb-3'>{pokeDetails.name}</h2>
          <div className="flex justify-center items-center gap-3 mb-4">
            {
              pokeDetails.types?.map((type, idx) => {
                return (
                  <Chip key={idx} value={type.type.name} color={type.slot === 1 ? 'green' : 'purple'} />
                )
              })
            }
          </div>
          <div className="flex flex-col gap-2">
            {
              pokeDetails.stats.map((e, idx) => {
                return (
                  <div className="w-full" key={idx}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <Typography color="blue-gray" variant="h6">
                        {e.stat.name}
                      </Typography>
                    </div>
                    <Progress value={e.base_stat} label color={setColor(e.stat.name)} className=' shadow-inner' />
                  </div>
                )
              })
            }
          </div>
          <IconButton className="rounded-full mt-4" color={isFavouritePage ? 'red' : isFavoritePokemon ? 'red' : 'black'} onClick={
            () => {
              isFavouritePage
                ?
                removeFromFavourite(pokeDetails.id)
                :
                addToFavourite(pokeDetails.id); setIsFavourite(true)
            }}>
            <FontAwesomeIcon icon={faHeart} />
          </IconButton>
        </div>
      </div>
      :
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
  )
}

export default Card