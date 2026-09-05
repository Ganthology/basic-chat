import { useCallback, useRef } from "react";

const INBOX_END_REACHED_THRESHOLD = 0.15;

type InboxEndReachedParams = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export function useInboxEndReached({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InboxEndReachedParams) {
  const hasUserScrolledRef = useRef(false);
  const isDraggingRef = useRef(false);
  const contentSettledRef = useRef(false);
  const inFlightRef = useRef(false);

  const onScrollBeginDrag = useCallback(() => {
    isDraggingRef.current = true;
    hasUserScrolledRef.current = true;
  }, []);

  const onScrollEndDrag = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const onScroll = useCallback(() => {
    if (isDraggingRef.current) {
      hasUserScrolledRef.current = true;
    }
  }, []);

  const onContentSizeChange = useCallback(() => {
    contentSettledRef.current = true;
  }, []);

  const onEndReached = useCallback(() => {
    if (
      !canFetchInboxNextPage({
        contentSettled: contentSettledRef.current,
        hasUserScrolled: hasUserScrolledRef.current,
        hasNextPage,
        isFetchingNextPage,
        inFlight: inFlightRef.current,
      })
    ) {
      return;
    }

    hasUserScrolledRef.current = false;
    inFlightRef.current = true;
    void fetchNextPage().finally(() => {
      inFlightRef.current = false;
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    onEndReached,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onContentSizeChange,
    onEndReachedThreshold: INBOX_END_REACHED_THRESHOLD,
  };
}

function canFetchInboxNextPage(input: {
  contentSettled: boolean;
  hasUserScrolled: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  inFlight: boolean;
}): boolean {
  return (
    input.contentSettled &&
    input.hasUserScrolled &&
    input.hasNextPage &&
    !input.isFetchingNextPage &&
    !input.inFlight
  );
}
