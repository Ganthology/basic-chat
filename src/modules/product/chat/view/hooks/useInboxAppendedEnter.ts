import { useState } from "react";

export function useInboxAppendedEnter(ids: readonly string[]) {
  const idsKey = ids.join("\0");
  const [snapshot, setSnapshot] = useState(() => ({
    idsKey,
    seenIds: new Set<string>() as ReadonlySet<string>,
  }));

  if (idsKey !== snapshot.idsKey) {
    const nextIds = idsKey.length === 0 ? [] : idsKey.split("\0");
    setSnapshot({
      idsKey,
      seenIds: nextSeenIds(snapshot.seenIds, nextIds),
    });
  }

  const seenIds = snapshot.seenIds;
  const isInitialPage = seenIds.size === 0;

  return (index: number): number | null => {
    if (isInitialPage) {
      return null;
    }

    const id = ids[index];
    if (id == null || seenIds.has(id)) {
      return null;
    }

    return appendedEnterOrder(ids, seenIds, index);
  };
}

function nextSeenIds(previous: ReadonlySet<string>, ids: readonly string[]): ReadonlySet<string> {
  if (ids.length === 0) {
    return previous.size === 0 ? previous : new Set();
  }

  let changed = false;
  const next = new Set(previous);
  for (const id of ids) {
    if (!next.has(id)) {
      next.add(id);
      changed = true;
    }
  }

  return changed ? next : previous;
}

function appendedEnterOrder(
  ids: readonly string[],
  seenIds: ReadonlySet<string>,
  index: number,
): number {
  let order = 0;
  for (let i = 0; i < index; i++) {
    const id = ids[i];
    if (id != null && !seenIds.has(id)) {
      order += 1;
    }
  }
  return order;
}
