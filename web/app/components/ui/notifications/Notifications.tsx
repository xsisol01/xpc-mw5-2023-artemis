import { FC, memo } from "react";

import { INotification } from "@/app/providers/notificationContextProvider";

import { Grid } from "@mui/material";
import NotificationMessage from "@/app/components/ui/notificationMessage/NotificationMessage";

interface IProps {
  messages: INotification[];
}

const Notifications: FC<IProps> = memo(({ messages }) => {
  const reverseMessages = [...messages].reverse();

  return (
    <Grid
      container
      spacing={1}
      sx={{
        position: "absolute",
        top: 5,
        right: 5,
        width: 300,
        zIndex: 5000,
      }}
    >
      {reverseMessages.map((message) => (
        <Grid item key={message.id} xs={12}>
          <NotificationMessage {...message} />
        </Grid>
      ))}
    </Grid>
  );
});

Notifications.displayName = "Notifications";

export default Notifications;
