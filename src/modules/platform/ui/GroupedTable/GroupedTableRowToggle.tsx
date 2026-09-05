import { Toggle, type ToggleProps } from "../Toggle";

export type GroupedTableRowToggleProps = ToggleProps;

export function GroupedTableRowToggle(props: GroupedTableRowToggleProps) {
  return <Toggle {...props} />;
}
