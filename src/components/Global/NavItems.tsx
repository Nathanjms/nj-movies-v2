import { FaClipboardCheck, FaQuestion, FaRandom } from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";

interface navItemsProps {
  link: string;
  text: string;
  icon: JSX.Element;
}

const navItems: navItemsProps[] = [
  {
    link: "/",
    text: "Movies",
    icon: <GiPopcorn />,
  },
  {
    link: "/watched",
    text: "Watched Movies",
    icon: <FaClipboardCheck />,
  },
  {
    link: "/random",
    text: "Random Movie Picker",
    icon: <FaRandom />,
  },
  {
    link: "/about",
    text: "About",
    icon: <FaQuestion />,
  },
];

export default navItems;
