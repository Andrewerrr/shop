import React from 'react';


type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="page-button"
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="page-button"
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
