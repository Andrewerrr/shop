import React, { useState } from 'react';

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
        <div style={containerStyle}>
            <div style={searchContainerStyle}>
                <h1 style={titleStyle}>Users</h1>
                <div style={searchInputWrapperStyle}>
                    <span style={searchIconStyle}>&#128269;</span>
                    <input
                        type="text"
                        placeholder="Search by any field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={searchInputStyle}
                    />
                    <button onClick={handleRefresh} style={clearButtonStyle}>&#10006;</button>
                </div>
            </div>
            <table style={tableStyle}>
                <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.key} style={headerCellStyle}>{column.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.map(user => (
                    <tr key={user.id} style={rowStyle}>
                        {columns.map(column => (
                            <td key={column.key} style={cellStyle}>
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

const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
};

const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#333',
    marginRight: '85%',
};

const searchContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: '10px',
};

const searchInputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
};

const searchInputStyle: React.CSSProperties = {
    padding: '10px 10px 10px 30px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#aaa',
};

const clearButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#aaa',
    fontSize: '16px',
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const headerCellStyle: React.CSSProperties = {
    padding: '12px 15px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f8f8',
    fontWeight: 'bold',
};

const cellStyle: React.CSSProperties = {
    padding: '12px 15px',
    border: '1px solid #ddd',
};

const rowStyle: React.CSSProperties = {
    backgroundColor: '#fff',
};

export default UserTable;
