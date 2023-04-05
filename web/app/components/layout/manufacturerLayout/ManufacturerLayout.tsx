import { FC, memo, ReactNode } from "react";

import styles from "./ManufacturerLayout.module.scss";
import ManufacturerItem from "@/app/components/ui/manufacturerItem/ManufacturerItem";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import {
  CircularProgress,
  Grid,
  List,
} from "@mui/material";
import { Container } from "@mui/system";

interface IProps {
  children?: ReactNode;
}

const ManufacturerLayout: FC<IProps> = memo(({ children }) => {
  const { manufacturers, isLoading } = useGetAllManufacturers();

  if (!manufacturers) {
    return <CircularProgress />
  }

  return (
    <div className={styles.ManufacturerLayout}>
      <Container>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={3} component="nav">
              <List
                component="ul"
                sx={{
                  height: "90vh",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  "& ul": { padding: 0 },
                }}
              >
                {manufacturers?.map((manufacturer) => (
                  <ManufacturerItem {...manufacturer} />
                ))}
              </List>
            </Grid>
            <Grid item xs={9}>
              {children}
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
});

export default ManufacturerLayout;
