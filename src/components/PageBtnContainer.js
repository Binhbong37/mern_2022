import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext();

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages;
        }
        changePage(newPage);
    };

    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = numOfPages;
        }

        changePage(newPage);
    };
    return (
        <Wrapper>
            <button className="prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft /> prev
            </button>

            <div className="btn-container">
                {pages.map((pageNum, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            className={
                                pageNum === page ? 'pageBtn active' : 'pageBtn'
                            }
                            onClick={() => changePage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            <button className="next-btn" onClick={nextPage}>
                <HiChevronDoubleRight /> next
            </button>
        </Wrapper>
    );
};

export default PageBtnContainer;
