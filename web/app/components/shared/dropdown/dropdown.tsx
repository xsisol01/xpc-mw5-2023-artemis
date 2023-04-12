import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState, FC, memo } from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
  wrapperWidth?: number;
  wrapperHeight?: number;
  contentWidth?: number;
  contentHeight?: number;
}

const Dropdown: FC<IProps> = memo(
  ({
    title,
    children,
    wrapperWidth,
    wrapperHeight,
    contentWidth,
    contentHeight,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen((isOpen) => !isOpen);
    };

    return (
      <List
        sx={{
          width: "100%",
          maxWidth: wrapperWidth === 0 ? '100%' : 360,
          bgcolor: "background.paper",
          maxHeight: wrapperHeight === 0 ? '100%' :  360,
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
              maxHeight: contentHeight === 0 ? '100%' : 300,
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

export default Dropdown;
