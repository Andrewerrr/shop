import React, {useState, useEffect} from 'react';
import './UsersPage.css';
import {User, Column} from './types'
import UserDetails from "./UserDetails";
import AddUserButton from './AddUserButton';
import AddUserSidebar from './AddUserSidebar';
import Pagination from './Pagination';
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import {data} from "./data";

const columns: Column[] = [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'},
    {key: 'email', label: 'Email'},
    {key: 'age', label: 'Age'},
    {key: 'isActive', label: 'Active', render: (value: boolean) => (value ? 'Yes' : 'No')},
    {key: 'phone', label: 'Phone'},
    {key: 'address', label: 'Address'},
    {
        key: 'registrationDate',
        label: 'Registration Date',
        render: (value: Date) => new Date(value).toLocaleDateString()
    },
    {
        key: 'lastLogin',
        label: 'Last Login',
        render: (value: Date) => new Date(value).toLocaleDateString()
    },
    {
        key: 'role',
        label: 'Role',
        render: (role: string) => <span style={getTextColorByRole(role)}>{role}</span>
    },
];

const getTextColorByRole = (role: string): React.CSSProperties => {
    switch (role) {
        case 'admin':
            return {color: 'red'};
        case 'user':
            return {color: 'blue'};
        case 'moderator':
            return {color: 'green'};
        default:
            return {color: 'black'};
    }
};


const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPageBeforeSearch, setLastPageBeforeSearch] = useState(1);
    const usersPerPage = 10;
    const [isAddUserSidebarOpen, setIsAddUserSidebarOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const getUsersData = () => {
        setUsers(data)
    }

    useEffect(() => {
       getUsersData()
    }, []);
    

    useEffect(() => {
        if (searchTerm) {
            setLastPageBeforeSearch(currentPage);
            setCurrentPage(1);
        } else {
            setCurrentPage(lastPageBeforeSearch);
        }
    }, [searchTerm]);


    const filteredData = users.filter(user => {
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

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseSidebar = () => {
        setSelectedUser(null);
        setIsAddUserSidebarOpen(false);
    };

    const handleAddUserClick = () => {
        setIsAddUserSidebarOpen(true);
    };


    const handleSaveUser = (newUser: { name: string; email: string; age: string; phone: string; address: string }) => {
        console.log(newUser);
    };


    return (
        <div className="container">
            <div className="search-container">
                <h1 className="title">Users</h1>
                <AddUserButton onClick={handleAddUserClick}/>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onAddUserClick={handleAddUserClick}
                />
            </div>
            <UserTable
                columns={columns}
                currentUsers={currentUsers}
                onUserClick={handleUserClick}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {selectedUser && (
                <UserDetails selectedUser={selectedUser}
                             handleCloseSidebar={handleCloseSidebar}
                />
            )}
            {isAddUserSidebarOpen && (<AddUserSidebar onClose={handleCloseSidebar} onSave={handleSaveUser}/>)}
        </div>
    );
};

export default UsersPage;