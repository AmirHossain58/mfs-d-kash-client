import React from 'react';
import MenuItem from './Menu/MenuItem';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';

const AgentMenu = () => {
    return (
        <>
        <MenuItem 
        icon={CgProfile} 
        label="My Profile"
        address="/" />
        <MenuItem
        icon={FaMoneyBillTransfer}
        label="Transaction"
        address="transaction-management"
      /> 
        </>
    );
};

export default AgentMenu;