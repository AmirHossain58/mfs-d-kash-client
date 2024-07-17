import MenuItem from "./MenuItem";

import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
const UserMenu = () => {

  return (
    <>
      <MenuItem icon={CgProfile} label="My Profile" address="/" />
      <MenuItem
        icon={FaMoneyBillTransfer}
        label="Send Money"
        address="send-money"
      />
      <MenuItem icon={GiMoneyStack} label="Cash-Out" address="cash-out" />
      <MenuItem icon={FcMoneyTransfer} label="Cash-in" address="cash-in" />
      <MenuItem
        icon={FaHistory}
        label="Transactions History"
        address="transactions-history"
      />
    </>
  );
};

export default UserMenu;
