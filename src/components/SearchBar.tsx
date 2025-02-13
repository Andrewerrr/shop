// SearchBar.tsx
import React from 'react';


type SearchBarProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onAddUserClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onAddUserClick }) => {
    return (
            <div className="search-input-wrapper">
                <span className="search-icon">&#128269;</span>
                <input
                    type="text"
                    placeholder="Search by any field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
    );
};

export default SearchBar;
