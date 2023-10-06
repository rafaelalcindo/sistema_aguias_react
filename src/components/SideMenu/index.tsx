import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { Context } from '../../context/AuthContext';
import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import styles from './styles.module.scss';


interface SideMenuProps {
    open: Boolean;
}

export function SideMenu({ open }: SideMenuProps) {

    const { handleLogOut } = useContext(Context);

    let initial = open ? { opacity: 0, x: -100, display: (open ? 'initial' : 'none') } : { opacity: 0, x: 0 };
    let animete = open ? { opacity: 1, x: 0 } : { opacity: 0.5, x: -100, display: 'none' };

    return (
        <motion.div
            // className="flex flex-col bg-darkLightBlue w-1/5 h-full px-2"
            className="flex flex-col bg-darkMiddleBlue w-1/5 px-2"
            initial={initial}
            animate={animete}
            transition={{ duration: 0.3, ease: "linear" }}

        >
            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/"}> Dashboard </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/usuarios"}> Cadastro </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/unidades"}> Unidades </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/pontounidades"}> Pontos de Unidades </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/pontousuarios"}> Pontos de Usuarios </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' ><Link to={"/eventos"}> Eventos </Link></h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' > <Link to={"/horaponto"}>Chegada</Link> </h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' >Aguitos</h2>
            </div>

            <div className="menuSelection flex flex-row h-12 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-1xl text-slate-300' onClick={() => handleLogOut()} >Logout</h2>
            </div>


        </motion.div>
    );
}