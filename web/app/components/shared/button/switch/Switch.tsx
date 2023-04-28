import { FC, memo, useContext } from "react";

import { RoleContext } from "@/app/providers/roleContextProvider";

import { Switch as MUISwitch } from "@mui/material";

const ControlledSwitches: FC = memo(() => {
  const { isAdmin, setIsAdmin } = useContext(RoleContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <MUISwitch
      checked={isAdmin}
      onChange={handleChange}
      color="primary"
      inputProps={{ "aria-label": "controlled" }}
      sx={{
        "& .MuiSwitch-track": {
          backgroundColor: "#ccc",
        },
      }}
    />
  );
});

ControlledSwitches.displayName = "ControlledSwitches";

export default ControlledSwitches;
