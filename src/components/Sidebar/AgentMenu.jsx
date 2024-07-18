import React from 'react';
import MenuItem from './Menu/MenuItem';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { FaHistory } from 'react-icons/fa';

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
       <MenuItem
        icon={FaHistory}
        label="Transactions History"
        address="transactions-history-agent"
      />
        </>
    );
};

export default AgentMenu;