import {FC, useContext} from 'react'

import { RoleContext } from '@/app/providers/roleContextProvider';

import {Switch as MUISwitch} from '@mui/material';

const ControlledSwitches: FC = () => {
  const {isAdmin, setIsAdmin} = useContext(RoleContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <MUISwitch
      checked={isAdmin}
      onChange={handleChange}
      color='primary'
      inputProps={{ 'aria-label': 'controlled' }}
      sx={{
        '& .MuiSwitch-track': {
          backgroundColor: '#ccc'
        }
      }}
    />
  );
}

export default ControlledSwitches