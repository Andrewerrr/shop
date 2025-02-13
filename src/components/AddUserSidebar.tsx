import React, {useState} from 'react';
import './AddUserSidebar.css';


type AddUserSidebarProps = {
    onClose: () => void;
    onSave: (user: { name: string; email: string; age: string; phone: string; address: string }) => void;
};

const AddUserSidebar: React.FC<AddUserSidebarProps> = ({onClose, onSave}) => {
    const [newUser, setNewUser] = useState({name: '', email: '', age: '', phone: '', address: ''});

    const handleSave = () => {
        onSave(newUser);
        onClose();
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-content-user">Add New User</div>
                <button className="close-sidebar" onClick={onClose}>&times;</button>
            </div>
            <div className="sidebar-user-info">

                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newUser.age}
                    onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                />
            </div>
            <button onClick={handleSave} className="save-button">Save User</button>
        </div>
    );
};

export default AddUserSidebar;
