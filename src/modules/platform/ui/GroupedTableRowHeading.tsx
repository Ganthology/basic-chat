import { Heading, type HeadingProps } from "./Heading";

export type GroupedTableRowHeadingProps = Omit<HeadingProps, "size" | "tone">;

export function GroupedTableRowHeading(props: GroupedTableRowHeadingProps) {
  return <Heading {...props} size="lg" tone="default" />;
}
