---
name: composable-ui
description: >-
  Design platform UI as compound, compose-first components. Use when adding or
  changing src/modules/platform/ui, Storybook stories, ListGroup/ListItem,
  Avatar, IconButton, or any nested/slot UI. Not for product screens unless
  they compose platform primitives.
---

# Composable UI

Platform UI is a tree you compose. Not a bag of ReactNode props.

Reference: `src/modules/platform/ui/ListGroup/` (`ListGroup.tsx` + `ListItem*.tsx`).

## Decide first

| Kind      | Pattern                                           | Examples                             |
| --------- | ------------------------------------------------- | ------------------------------------ |
| Primitive | One node. Variants are props.                     | `Heading`, `Paragraph`, `IconButton` |
| Compound  | Parent owns the tree. Parts attach on the parent. | `ListGroup`, `Avatar`                |

Do not invent slots for primitives. `IconButton` children = the icon. `size` / `variant` / `tone` stay props.

## Compound rules

1. **Parent > child.** Outer name owns the API. `ListGroup.Item`, not `ListItem.Group`.
2. **Compose UI. No ReactNode props.** `trailing={...}` is wrong. `<Parent.Trailing>...</Parent.Trailing>` is right.
3. **Data props are fine.** Strings, numbers, flags: `initials`, `selected`, `rounded`, `size`.
4. **One file per part.** `ListItemHeadline.tsx` exports `ListItemHeadline`. Attach on the parent. One folder per root (`ui/ListGroup/`). Folder `index.ts` is the public entry only.
5. **Detect slots with `child.type === Part`.** Same function reference as the attached part.

```tsx
export const ListGroup = Object.assign(ListGroupRoot, {
  Item: ListItem,
});

export const ListItem = Object.assign(ListItemRoot, {
  Avatar,
  Content: ListItemContent,
  Headline: ListItemHeadline,
  Trailing: ListItemTrailing,
});
```

```tsx
<ListGroup>
  <ListGroup.Item>
    <ListGroup.Item.Avatar initials="MC" />
    <ListGroup.Item.Content>
      <ListGroup.Item.Headline>
        <Heading size="lg">Maya Chen</Heading>
        <ListGroup.Item.Trailing>
          <Paragraph size="sm" tone="tertiary">
            9:41 AM
          </Paragraph>
        </ListGroup.Item.Trailing>
      </ListGroup.Item.Headline>
    </ListGroup.Item.Content>
  </ListGroup.Item>
</ListGroup>
```

## Container vs item

- Group/container owns `color.container` fill (and optional radius).
- Item is a row. Press/selected tints `color.containerSelected`. No scale transform.
- Import the root (`ListGroup`). Call parts as `Root.Part`.

## Wrong

```tsx
<ListItem.Group>                 // child owning parent
<Headline trailing={<Time />} /> // ReactNode prop
<IconButton icon={<Plus />} />   // slot as prop; use children
```

## Skeleton

Bones are static. Wrap the group in `Skeleton.View` so they share one pulse. `Parent.Skeleton` lives in the parent folder.

```tsx
if (loading) {
  return (
    <Skeleton.View>
      <ListItem.Skeleton />
    </Skeleton.View>
  );
}

<Skeleton.View>
  <Avatar.Skeleton size="sm" />
  <Heading.Skeleton size="md" />
</Skeleton.View>
```

Do not nest `Skeleton.View` inside a part.

## Stories

Colocate `*.stories.tsx`. Show the full compose tree, not flattened props. Title = the root (`ui/ListGroup`, `ui/Avatar`).
