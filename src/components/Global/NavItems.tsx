import { FaClipboardCheck, FaQuestion, FaRandom } from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";

interface navItemsProps {
  link: string;
  text: string;
  icon: JSX.Element;
  auth: boolean;
}

const navItems: navItemsProps[] = [
  {
    link: "/",
    text: "Movies",
    icon: <GiPopcorn />,
    auth: true,
  },
  {
    link: "/watched",
    text: "Watched Movies",
    icon: <FaClipboardCheck />,
    auth: true,
  },
  {
    link: "/random",
    text: "Random Movie Picker",
    auth: true,
    icon: <FaRandom />,
  },
  {
    link: "/about",
    text: "About",
    icon: <FaQuestion />,
    auth: false,
  },
];

export default navItems;
