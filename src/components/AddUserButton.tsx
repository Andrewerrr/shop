import React from 'react';
import './AddUserButton.css';

const AddUserButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button className="add-user-button" onClick={onClick}>
            Add New User
        </button>
    );
};

export default AddUserButton;
