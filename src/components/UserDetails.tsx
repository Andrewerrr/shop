import React, {useState} from 'react';
import './UsersPage.css';
import {User} from "./types";


const UserDetails: React.FC<{ selectedUser: User; handleCloseSidebar: () => void }> = ({
                                                                                           selectedUser,
                                                                                           handleCloseSidebar
                                                                                       }) => {


    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <div className="sidebar-content-user">User Details</div>
                    <button className="close-sidebar" onClick={handleCloseSidebar}>&times;</button>
                </div>
                <div className="sidebar-user-info">
                    <p><strong>ID:</strong> {selectedUser.id}</p>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Age:</strong> {selectedUser.age}</p>
                    <p><strong>Active:</strong> {selectedUser.isActive ? 'Yes' : 'No'}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Address:</strong> {selectedUser.address}</p>
                    <p><strong>Registration Date:</strong> {selectedUser.registrationDate.toLocaleDateString()}</p>
                    <p><strong>Last Login:</strong> {selectedUser.lastLogin.toLocaleDateString()}</p>
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;