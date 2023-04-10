import { FC, memo, ReactNode } from "react";

import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { globalStyles } from "@/app/assets/styles/global.styles";
import LeftMenuItems from "../../ui/leftMenuItems/LeftMenuItems";
import { ILeftMenuItem } from "../../ui/leftMenuItem/leftMenuItem.type";

interface IProps {
  options: ILeftMenuItem[]
  children?: ReactNode
  linkTo: string
}

const ManufacturerLayout: FC<IProps> = memo(({ children, options, linkTo}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ ...globalStyles.fullScroll }}>
          <LeftMenuItems options={options} linkTo={linkTo} />
        </Grid>
        <Grid item xs={9} sx={{ mt: 2, ...globalStyles.fullScroll }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
});

export default ManufacturerLayout;
