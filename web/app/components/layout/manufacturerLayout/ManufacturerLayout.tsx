import { FC, memo, ReactNode } from "react";

import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import Manufacturers from "../../ui/manufacturers/Manufacturers";
import { globalStyles } from "@/app/assets/styles/global.styles";

interface IProps {
  children?: ReactNode;
}

const ManufacturerLayout: FC<IProps> = memo(({ children }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ ...globalStyles.fullScroll }}>
          <Manufacturers />
        </Grid>
        <Grid item xs={9} sx={{ mt: 2, ...globalStyles.fullScroll }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
});

export default ManufacturerLayout;
