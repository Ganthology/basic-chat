import { Text, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

type ProfileScreenProps = {
  userId: string;
};

export function ProfileScreen({ userId }: ProfileScreenProps) {
  return (
    <View style={styles.root}>
      <View style={styles.identity}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Contact</Text>
        <Text style={styles.phone}>Phone</Text>
        <Text style={styles.meta}>{userId}</Text>
      </View>
    </View>
  );
}

const styles = createStyles(({ color, fontFamily, fontSize, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
    padding: padding.lg,
  },
  identity: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: padding.xxl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: color.surface,
  },
  name: {
    color: color.text,
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize.xl,
  },
  phone: {
    color: color.textSecondary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
  },
  meta: {
    color: color.textTertiary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
  },
}));
