import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**Function for automatically scrolling to the top of the page
 * when the path name(URL) is changed*/
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
