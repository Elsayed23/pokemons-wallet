import { Option, Select } from '@material-tailwind/react'
import React, { useContext } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { MyContext } from '../../context/Context';

const Filter = () => {
    const [open, setOpen] = React.useState(false);
    const types = ['All', 'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const { currType, setCurrType } = useContext(MyContext)


    function handleChange(value) {
        setCurrType(value)
    }


    return (
        <React.Fragment>
            <div className="fixed top-32 z-50">
                <Button onClick={openDrawer} size='sm' variant='filled' className="rounded-none rounded-tr-md rounded-br-md px-3">
                    Filter
                </Button>
            </div>
            <Drawer open={open} onClose={closeDrawer} className="p-4" overlay={false} size={270}>
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Pokemons
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="flex w-full flex-col gap-6">
                    <Select variant="static" value={currType.toLocaleLowerCase()} label="Filter By Type" color='blue' onChange={handleChange}>
                        {
                            types.map((type, idx) => {
                                return (

                                    <Option value={type.toLocaleLowerCase()} key={idx}>{type}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default Filter