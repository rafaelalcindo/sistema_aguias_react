import React, { useState, ButtonHTMLAttributes } from 'react';
import { HiUser } from "react-icons/hi";

import history from '../../services/history';
import userIcon from '../../assets/user_icon.jpg';

import SecondaryButton from '../Buttons/SecondaryButton';
import PrimaryButton from '../Buttons/PrimaryButton';

type PainelFormProps = ButtonHTMLAttributes<HTMLAllCollection> & {
    title: string;
    description: string;
    formName: string;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    setImgUser?: (img: any) => void;
    imgUser?: any;
    imageExist?: boolean;
}

export function PainelForm({
    title,
    description,
    formName,
    isLoading,
    setImgUser,
    imgUser,
    imageExist,
    children
}: PainelFormProps) {

    return (
        <div className="bg-lightWhite shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>

                    {
                        imageExist ?
                            <div className='flex justify-center' >
                                <label htmlFor="img-input" className='mt-10 w-32 h-40 border-2 border-solid rounded-lg'>

                                    <input
                                        // {...register("img")}
                                        type="file"
                                        id="img-input"
                                        className="hidden"
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={(e: any) => {
                                            console.log(e.target.files[0]);
                                            if (setImgUser)
                                                setImgUser(e.target.files[0]);
                                            // setLoadImg(
                                            //     URL.createObjectURL(
                                            //         e.target.files[0]
                                            //     )
                                            // );
                                            // setValue("img", e.target.files[0]);
                                        }}
                                    />

                                    <img
                                        className='w-32 h-40 rounded-lg cursor-pointer'
                                        src={
                                            imgUser ?
                                                (typeof imgUser === 'string') ?
                                                    imgUser
                                                    :
                                                    URL.createObjectURL(
                                                        imgUser
                                                    )
                                                :
                                                userIcon
                                        }
                                        alt='user_icon'
                                    />
                                </label>
                            </div>
                            :
                            ''
                    }



                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    {children}
                </div>
            </div>
            <div className="mt-6 w-full flex justify-center md:justify-end gap-3">
                <div
                    className="w-full md:w-32"
                    onClick={() => history.back()}
                >
                    <SecondaryButton title="Voltar" />
                </div>
                <div className="w-full md:w-32">
                    <PrimaryButton
                        title="Salvar"
                        form={formName}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}