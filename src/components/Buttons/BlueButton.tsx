import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
};

function BlueButton({ title, ...rest }: ButtonProps) {
    return (
        <button
            className="w-full bg-secondary rounded h-12 hover:opacity-75 font-semibold font-sans text-white"
            {...rest}
        >
            {title}
        </button>
    );
}

export default BlueButton;
