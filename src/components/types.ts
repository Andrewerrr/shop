import React from 'react';

export type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    phone: string;
    address: string;
    registrationDate: Date;
    lastLogin: Date;
    role: string;

    [key: string]: any;
};

export type Column = {
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
};




