import {
  INotification,
  NotificationContext,
  notificationType,
} from "@/app/providers/notificationContextProvider";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  createTheme,
  Typography,
} from "@mui/material";
import { FC, memo, useContext } from "react";
import DeleteButton from "../../shared/button/deleteButton/DeleteButton";

// const theme = createTheme({
//   palette: {
//     [notificationType.error]: {
//       main: theme.palette.success.dark
//     }
//   },
// });

const NotificationMessage: FC<INotification> = memo(({ id, text, type }) => {
  const { deleteMessage } = useContext(NotificationContext);

  return (
    <Card
      sx={{
        py: 2,
        px: 1,
        backgroundColor: `${type}.main`,
        position: "relative",
      }}
    >
      <Typography variant="body1" sx={{ color: "#fff" }}>
        {capitalize(text)}
      </Typography>
      <CardActions sx={{ m: 0, p: 0, position: "absolute", top: 5, right: 5 }}>
        <Button
          color="error"
          onClick={() => deleteMessage(id)}
          sx={{
            m: 0,
            p: 0,
            minWidth: '20px',
            backgroundColor: "transparent",
            color: '#fff'
          }}
        >
          x
        </Button>
      </CardActions>
    </Card>
  );
});

NotificationMessage.displayName = "NotificationMessage";

export default NotificationMessage;
