import { OneSignal } from "react-native-onesignal";

export const tagUserEmailCreate = (email: string) =>
  OneSignal.User.addTag("user_email", email);

export const tagCartUpdate = (itemsCount: string) =>
  OneSignal.User.addTag("cart_items_count", itemsCount);
