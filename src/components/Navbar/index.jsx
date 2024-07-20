import { Avatar } from "@mui/material";
import { Button } from "../ui/button";

const Navbar = () => {
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
          <Button className="bg-red-500 text-white hover:bg-red-700">
            Logout
          </Button>
          <Avatar className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
