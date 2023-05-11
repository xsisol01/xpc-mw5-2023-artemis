import { FC, memo } from "react";

import { IconButton } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";

interface IProps {
  value: string;
  onSearch?: () => void;
  onClose?: () => void;
}

const SearchIcon: FC<IProps> = memo(({ value, onClose, onSearch }) => {
  return value?.length ? (
    <IconButton
      type="button"
      sx={{ p: "10px" }}
      aria-label="search"
      onClick={onClose}
    >
      <Clear />
    </IconButton>
  ) : (
    <IconButton
      type="button"
      sx={{ p: "10px" }}
      aria-label="search"
      onClick={onSearch}
    >
      <Search />
    </IconButton>
  );
});

SearchIcon.displayName = "SearchIcon";

export default SearchIcon;
