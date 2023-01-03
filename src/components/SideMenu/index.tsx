import React from 'react';

import * as yup from 'yup';
import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import styles from './styles.module.scss';

export function SideMenu() {
    return (
        <div className="flex flex-col bg-middleBlue w-1/5 h-full px-2">
            <div className="menuSelection flex flex-row h-20 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-4xl text-slate-300' >Cadastro</h2>
            </div>

            <div className="menuSelection flex flex-row h-20 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-4xl text-slate-300' >Listagem</h2>
            </div>

            <div className="menuSelection flex flex-row h-20 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-4xl text-slate-300' >Chegada</h2>
            </div>

            <div className="menuSelection flex flex-row h-20 w-full border-b-2 pl-4 items-center cursor-pointer">
                <h2 className='text-lg text-4xl text-slate-300' >Aguitos</h2>
            </div>
        </div>
    );
}