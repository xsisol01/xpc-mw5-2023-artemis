import { useState, FC, memo } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

interface IProps {
  title: string;
  children: React.ReactNode;
  wrapperWidth?: number;
  wrapperHeight?: number;
  contentHeight?: number;
  defaultOpen?: boolean;
}

const Dropdown: FC<IProps> = memo(
  ({
    title,
    children,
    wrapperWidth,
    wrapperHeight,
    contentHeight,
    defaultOpen = false,
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleClick = () => {
      setIsOpen((isOpen) => !isOpen);
    };

    return (
      <List
        sx={{
          width: "100%",
          maxWidth: wrapperWidth === 0 ? "100%" : 360,
          bgcolor: "background.paper",
          maxHeight: wrapperHeight === 0 ? "100%" : 360,
          pt: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={title} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List
            sx={{
              p: 1,
              width: "100%",
              maxHeight: contentHeight === 0 ? "100%" : 300,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              "& ul": { padding: 0 },
              "&::-webkit-scrollbar": {
                /* width */ width: "3px",
              },
              "&::-webkit-scrollbar-track": {
                /* Track */ backgroundColor: "#fff",
              },
              "&::-webkit-scrollbar-thumb": {
                /* Handle */ backgroundColor: "#ccc",
                borderRadius: "4px",
              },
            }}
            subheader={<li />}
            component="div"
            disablePadding
          >
            {children}
          </List>
        </Collapse>
      </List>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
