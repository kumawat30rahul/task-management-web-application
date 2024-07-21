import { Avatar } from "@mui/material";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import CommonDialog from "../common/common-dialog";
import { useNavigate } from "react-router-dom";
import { SheetDemo } from "./userDetailsSheet";
import { getUserDetails } from "@/Config/services";

const Navbar = () => {
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isUserDetailsModal, setIsUserDetailsModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userDetails"))?.userId;
  console.log(userId);
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

  const dialogContent = () => {
    return (
      <div>
        <span>Are you sure you want to logout?</span>
        <div className="flex items-center justify-end w-full gap-2">
          <Button className="bg-blue-500" onClick={handleLogout}>
            Yes
          </Button>
          <Button className="bg-red-500" onClick={handleClose}>
            No
          </Button>
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setIsLogoutModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openUserDetailsFunc = () => {
    setIsUserDetailsModal(true);
  };

  const getUserDetailsFunc = async (userId) => {
    try {
      const response = await getUserDetails(userId);
      setUserDetails(response?.data);
    } catch (error) {
      setUserDetails(null);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetailsFunc(userId);
    }
  }, [userId]);
  return (
    <div className="flex items-center justify-center p-2 bg-blue-500">
      <div className="flex items-center justify-between w-full">
        <div className="h-full w-auto">
          <img
            src="https://preview.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=640&crop=smart&auto=webp&s=04d231d246026a59f988ac183a82e0ea2ca8ef4e"
            alt="logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <CommonDialog
            isOpen={isLogoutModal}
            setIsOpen={() => setIsLogoutModal(true)}
            dialogContent={dialogContent()}
            title={"Logout"}
            setIsClose={handleClose}
          >
            <Button className="bg-red-500 text-white hover:bg-red-700">
              Logout
            </Button>
          </CommonDialog>
          <SheetDemo
            triggerButton={
              <Avatar
                className="cursor-pointer"
                onClick={openUserDetailsFunc}
                src={userDetails?.logo}
              />
            }
          >
            <div className="w-full flex items-center justify-center flex-col gap-3">
              <div className="w-full flex items-center justify-center relative">
                <Avatar
                  src={userDetails?.logo}
                  sx={{ height: 100, width: 100 }}
                />
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col items-start justify-start">
                  <span>Name</span>
                  <span className="text-md font-bold">
                    {userDetails?.firstName + " " + userDetails?.lastName}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <span>Email</span>
                  <span className="text-md font-bold">
                    {userDetails?.email}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <span>Created At</span>
                  <span className="text-md font-bold">
                    {userDetails?.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </SheetDemo>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
