import { Paragraph, type ParagraphProps } from "../Paragraph";

export type GroupedTableRowParagraphProps = Omit<ParagraphProps, "size" | "tone">;

export function GroupedTableRowParagraph(props: GroupedTableRowParagraphProps) {
  return <Paragraph {...props} size="md" tone="secondary" />;
}
