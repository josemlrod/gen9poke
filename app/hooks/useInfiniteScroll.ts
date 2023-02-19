import { useCallback, useRef } from "react";

type Props = {
  nextPageUrl: string;
  onEntryIntersection: () => void;
  observerOptions?: {
    root?: Element;
    rootMargin?: string;
    threshold?: number;
  };
};

export function useInfiniteScroll({
  nextPageUrl,
  onEntryIntersection,
  observerOptions = { rootMargin: "100px", threshold: 0.1 },
}: Props) {
  const intersectionObserver = useRef();
  const lastEntryRef = useCallback(
    (entry: Element) => {
      // if there are no pages to the list
      // there's no need to observe any entries
      if (nextPageUrl) {
        // if the currentPage is greater than
        // the total amount of pages, disconnect
        // the observer and return
        // if (currentPage > listPages.totalPages) {
        //   if (intersectionObserver.current) {
        //     intersectionObserver.current.disconnect();
        //   }
        //   return;
        // }

        // if there are more pages, and we already have an
        // observer, disconnect the observer from the previous
        // last entry, so that we can assign it to the new
        // last entry
        if (intersectionObserver.current) {
          intersectionObserver.current.disconnect();
        }

        // replace the previous existing observer with a new one
        intersectionObserver.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              onEntryIntersection();
            }
          },
          { ...observerOptions }
        );

        // start observing the new last entry on the list
        if (entry) {
          intersectionObserver.current.observe(entry);
        }
      } else {
        if (intersectionObserver.current) {
          intersectionObserver.current.disconnect();
        }
      }
    },
    [nextPageUrl, observerOptions, onEntryIntersection]
  );

  return lastEntryRef;
}
