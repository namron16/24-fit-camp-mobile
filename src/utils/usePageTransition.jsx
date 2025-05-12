import { useState, useEffect, useTransition } from "react";

const usePageTransition = (delay = 1000) => {
  const [isPending, startTransition] = useTransition();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => setShowContent(true), delay);
    });
  }, [delay]);

  return { isPending, showContent };
};

export default usePageTransition;
