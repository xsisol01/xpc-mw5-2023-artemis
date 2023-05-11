import { createContext, useState, useMemo, FC, memo } from "react";

import Notifications from "@/app/components/ui/notifications/Notifications";
import { createId } from "@/app/utils/createId";

interface IContext {
  addMessage: (message: ICreateNotification) => void;
  deleteMessage: (messageId: string) => void;
}

export const notificationType = Object.freeze({
  success: "success",
  warning: "warning",
  info: "info",
  error: "error",
});

export interface INotification {
  id: string;
  text: string;
  type: "success" | "warning" | "error" | "info";
}

export interface ICreateNotification {
  text: string;
  type: "success" | "warning" | "error" | "info";
}

export const NotificationContext = createContext<IContext>({} as IContext);

interface IProps {
  children: React.ReactNode;
}

const NotificationContextProvider: FC<IProps> = memo(({ children }) => {
  const [messages, setMessage] = useState<INotification[]>(
    [] as INotification[]
  );

  const addMessage = (message: ICreateNotification) => {
    const newMessage = {
      ...message,
      id: createId(),
    };

    setTimeout(() => {
      deleteMessage(newMessage.id);
    }, 3000);

    setMessage((prev) => [...prev, newMessage]);
  };

  const deleteMessage = (id: string) => {
    setMessage((prev) => prev.filter((message) => message.id !== id));
  };

  const value = useMemo(
    () => ({
      addMessage,
      deleteMessage,
    }),
    []
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {messages.length && <Notifications messages={messages} />}
    </NotificationContext.Provider>
  );
});

NotificationContextProvider.displayName = "NotificationContextProvider";

export default NotificationContextProvider;
