import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // এখানে page scroll position top left set হয়
  }, [pathname]);

  return null;
}

export default ScrollToTop;
