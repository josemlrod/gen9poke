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
  observerOptions = { rootMargin: "500px", threshold: 0.1 },
}: Props) {
  const intersectionObserver = useRef();
  const lastEntryRef = useCallback(
    (entry: Element) => {
      if (nextPageUrl) {
        if (intersectionObserver.current) {
          intersectionObserver.current.disconnect();
        }

        intersectionObserver.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              onEntryIntersection();
            }
          },
          { ...observerOptions }
        );

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
