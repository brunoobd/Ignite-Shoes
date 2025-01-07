import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import {
  NotificationWillDisplayEvent,
  OneSignal,
  OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const onCloseNotification = () => setNotification(undefined);

  useEffect(() => {
    const handleGetNotification = (event: NotificationWillDisplayEvent) => {
      event.preventDefault();
      setNotification(event.getNotification());
    };

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleGetNotification
    );

    return () =>
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleGetNotification
      );
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {!!notification && (
        <Notification data={notification} onClose={onCloseNotification} />
      )}
    </NavigationContainer>
  );
}
