import { ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    isLoading?: boolean;
};

export default function PrimaryButton({
    title,
    isLoading,
    children,
    ...rest
}: PrimaryButtonProps) {
    return (
        <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#4d4d4d] hover:bg-mainDarkRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainDarkRed"
            {...rest}
        >
            {isLoading ? (
                <FaSpinner className="animate-spin mx-auto" size={20} />
            ) : (
                title || children
            )}
        </button>
    );
}
