import { FC, memo, ReactNode } from "react";

import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import LeftMenuItems from "@/app/components/ui/leftMenuItems/LeftMenuItems";

import { ILeftMenuItem } from "@/app/components/ui/leftMenuItem/leftMenuItem.type";
import { globalStyles } from "@/app/assets/styles/global.styles";

interface IProps {
  options: ILeftMenuItem[] | undefined;
  children?: ReactNode;
  linkTo: string;
}

const ManufacturerLayout: FC<IProps> = memo(({ children, options, linkTo }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ ...globalStyles.fullScroll, mt: 2 }}>
          <LeftMenuItems options={options} linkTo={linkTo} />
        </Grid>
        <Grid item xs={9} sx={{ mt: 2, ...globalStyles.fullScroll }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
});

ManufacturerLayout.displayName = "ManufacturerLayout";

export default ManufacturerLayout;
