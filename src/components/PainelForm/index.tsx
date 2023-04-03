import React, { useState, ButtonHTMLAttributes } from 'react';
import history from '../../services/history';

import SecondaryButton from '../Buttons/SecondaryButton';
import PrimaryButton from '../Buttons/PrimaryButton';

type PainelFormProps = ButtonHTMLAttributes<HTMLAllCollection> & {
    title: string;
    description: string;
}

export function PainelForm({
    title,
    description,
    children
}: PainelFormProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                        form="userRegisterForm"
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}