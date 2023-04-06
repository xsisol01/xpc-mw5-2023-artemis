import { FC, memo } from "react";

import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";

const UploadImage: FC = memo(() => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );
});

export default UploadImage;
