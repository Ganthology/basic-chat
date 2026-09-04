import { useLocalSearchParams } from "expo-router";

import { ProfileScreen } from "@/modules/product/user/view/screens/ProfileScreen";

export default function ProfileRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    return null;
  }

  return <ProfileScreen userId={userId} />;
}
