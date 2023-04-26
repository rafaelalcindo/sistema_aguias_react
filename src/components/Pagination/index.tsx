import React, { useContext, useEffect, useState } from "react";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import history from "../../services/history";

type PaginationProps = {
    initPage: number;
    totalPage: number;
    page: number;
    setPage: (state: number) => void;
    path?: string;
};

export function Pagination({
    initPage,
    totalPage,
    page,
    setPage,
    path,
}: PaginationProps) {


    function nextPage(currentPage: number, middleNumber: boolean = false) {


        if (currentPage > totalPage) {
            setPage(totalPage);
            // return;
        } else {

            setPage(currentPage);
            // if (middleNumber) {
            //     history.push(`/${path}/page=${currentPage}`);
            // }
        }
    }

    function previousPage(currentPage: number, middleNumber: boolean = false) {
        if (currentPage < 1) {
            setPage(1);
            // return;
        } else {
            setPage(currentPage);
            // if (middleNumber) {
            //     history.push(`/${path}/page=${currentPage}`);
            // }
        }
    }

    function* range(inicio: number, fim: number, incremento = 1) {
        if (fim === undefined) {
            [inicio, fim] = [0, inicio];
        }

        if (fim > inicio) {
            if (incremento < 0) incremento *= -1;
            for (var i = inicio; i < fim; i += incremento) {
                yield i;
            }
        } else {
            if (incremento > 0) incremento *= -1;
            for (var i = inicio; i > fim; i += incremento) {
                yield i;
            }
        }
    }

    // Array de 1 a ultimapagina
    var pages = Array.from(range(1, totalPage + 1));

    return (
        <div className="w-full text-white flex justify-center items-center gap-1">
            <a>
                <div
                    className="bg-white w-6 h-6 rounded-full text-darkPurple cursor-pointer flex items-center justify-center text-black"
                    onClick={() => previousPage(page - 1 >= 1 ? page - 1 : 1)}
                >
                    <HiChevronLeft size={24} />
                </div>
            </a>
            <div className="flex bg-white rounded-xl">
                {pages.map((itemPage, index) => (
                    <div
                        key={index}
                        className={
                            page == itemPage
                                ? "rounded-full bg-stone-600 bg-darkBlue w-7 h-7 flex items-center justify-center text-black"
                                : "rounded-xl text-darkBlue w-7 h-7 flex items-center justify-center cursor-pointer text-black"
                        }
                        onClick={() => nextPage(itemPage, true)}
                    >
                        {itemPage}
                    </div>
                ))}
            </div>

            <a>
                <div
                    className="bg-white w-6 h-6 rounded-full text-darkPurple cursor-pointer flex items-center justify-center text-black"
                    onClick={() => {
                        nextPage(page + 1 <= totalPage ? page + 1 : totalPage);
                    }}
                >
                    <HiChevronRight size={24} />
                </div>
            </a>
        </div>
    );
}
