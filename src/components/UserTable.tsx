// UserTable.tsx
import React from 'react';
import { User, Column } from './types';


type UserTableProps = {
    columns: Column[];
    currentUsers: User[];
    onUserClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ columns, currentUsers, onUserClick }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.key} className="header-cell">{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {currentUsers.map(user => (
                <tr key={user.id} className="row" onClick={() => onUserClick(user)}>
                    {columns.map(column => (
                        <td key={column.key} className="cell">
                            {column.render ? column.render(user[column.key]) : user[column.key]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;
