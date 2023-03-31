import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { UsuarioProps } from '../../../types/Usuario';

type UsuarioTable = {
    title: string;
    list?: UsuarioProps[];
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export function UsuarioTable({ title, list }: UsuarioTable) {



    return (
        <div className="w-full">
            <div className="p-2 flex items-center justify-center body">
                <div className="container">
                    <div className=" bg-darkPurple rounded-t-xl py-2 px-4 text-white">
                        {title}
                    </div>
                    <table className="w-full  bg-darkestBlue rounded-b-lg  sm:shadow-lg">
                        <thead >
                            <tr className={`flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-5 sm:mb-0 lg:mb-0`}>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    Nome
                                </th>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    Unidade
                                </th>
                                <th className={`p-3 text-left h-1/6 lg:w-10 text-xs sm:text-base `} >
                                    Ação
                                </th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr className="flex flex-col flex-no wrap lg:table-row mb-5 sm:mb-0 line">
                                <td className="p-3 h-1/6 text-xs sm:text-base">
                                    Ricardo
                                </td>

                                <td className="p-3 h-1/6 text-xs sm:text-base">
                                    Águia de Fogo
                                </td>

                                <td className="p-3 h-1/6 text-xs sm:text-base">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                Opções
                                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Account settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Support
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                License
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <form method="POST" action="#">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block w-full px-4 py-2 text-left text-sm'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </form>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </td>
                            </tr>


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
}