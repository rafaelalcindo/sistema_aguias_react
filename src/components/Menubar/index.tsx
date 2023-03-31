import React, { useState } from 'react';

import { motion } from 'framer-motion';
import * as yup from 'yup';
import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import styles from './styles.module.scss';

import { FiMenu, FiX } from 'react-icons/fi';
import { SideMenu } from '../SideMenu';

interface MenuBarProps {
    children: React.ReactNode;
}

export function Menubar({ children }: MenuBarProps) {

    const [openMenu, setOpenMenu] = useState(false);

    function changeMenu() {
        setOpenMenu(!openMenu);
    }

    return (
        <>
            <div className="menuPart h-screen">
                <div className="flex fles-row h-24 w-full bg-darkBlue items-center pl-12">


                    <div className='cursor-pointer'>
                        {
                            openMenu ?
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiX
                                        size={60}
                                        color={'#ffffff'}
                                        onClick={changeMenu}
                                    />
                                </motion.div>

                                :
                                <motion.section
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiMenu
                                        size={60}
                                        color={'#ffffff'}
                                        onClick={changeMenu}
                                    />
                                </motion.section>


                        }
                    </div>

                    <div className="logoPart flex flex-row w-full justify-center">
                        <img
                            className="h-20 w-auto cursor-pointer"
                            src={aguias}
                            alt="aguias logo"
                        />
                    </div>

                </div>

                <div className='flex flex-row h-full' >
                    <SideMenu
                        open={openMenu}
                    />

                    {children}
                </div>


            </div>
        </>
    );
}
