import { FC, memo } from "react";

import Header from "@/app/components/ui/header/Header";
import { Box, Container } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}

const HeaderLayout: FC<IProps> = memo(({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{mt: 8, pt: 1}}>
        {children}
      </Container>
    </>
  );
});

HeaderLayout.displayName = "HeaderLayout";

export default HeaderLayout;
