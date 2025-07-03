import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="
        text-xl 
        font-bold 
        text-green-600 
        dark:text-green-400 
        hover:text-green-700 
        dark:hover:text-green-300 
        transition-colors 
        duration-300 
        select-none
        tracking-normal
        "
      aria-label="Recipe Book Home"
    >
      Recipe Book
    </Link>
  );
};

export default Logo;
