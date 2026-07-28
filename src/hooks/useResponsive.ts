import { useMediaQuery } from "react-responsive";

const useResponsive = (query: number) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${query}px)` });
  return { isMobile };
};

export { useResponsive };
