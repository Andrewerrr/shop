import React, { useState } from 'react';
import './UsersPage.css';

type User = {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    phone: string;
    address: string;
    registrationDate: Date;
    lastLogin: Date;
    role: string;
};

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'isActive', label: 'Active', render: (value: boolean) => (value ? 'Yes' : 'No') },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'registrationDate', label: 'Registration Date', render: (value: Date) => new Date(value).toLocaleDateString() },
    { key: 'lastLogin', label: 'Last Login', render: (value: Date) => new Date(value).toLocaleDateString() },
    { key: 'role', label: 'Role', render: (role: string) => <span style={getTextColorByRole(role)}>{role}</span> },
];

const getTextColorByRole = (role: string): React.CSSProperties => {
    switch (role) {
        case 'admin':
            return { color: 'red' };
        case 'user':
            return { color: 'blue' };
        case 'moderator':
            return { color: 'green' };
        default:
            return { color: 'black' };
    }
};

const UserTable: React.FC<{ data: User[] }> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleRefresh = () => {
        setSearchTerm('');
    };

    const filteredData = data.filter(user => {
        const searchInValues = [
            user.name,
            user.email,
            user.age.toString(),
            user.isActive ? 'Yes' : 'No',
            user.phone,
            user.address,
            user.registrationDate.toLocaleDateString(),
            user.lastLogin.toLocaleDateString(),
            user.role
        ].join(' ');

        return searchInValues.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container">
            <div className="search-container">
                <h1 className="title">Users</h1>
                <div className="search-input-wrapper">
                    <span className="search-icon">&#128269;</span>
                    <input
                        type="text"
                        placeholder="Search by any field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={handleRefresh} className="clear-button">&#10006;</button>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.key} className="header-cell">{column.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.map(user => (
                    <tr key={user.id} className="row">
                        {columns.map(column => (
                            <td key={column.key} className="cell">
                                {/*// @ts-ignore*/}
                                {column.render ? column.render(user[column.key]) : user[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
