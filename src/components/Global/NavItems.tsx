import { FaFilm, FaQuestion, FaRandom, FaStopwatch } from "react-icons/fa";

interface navItemsProps {
  link: string;
  text: string;
  icon: JSX.Element;
}

const navItems: navItemsProps[] = [
  {
    link: "/",
    text: "Movies",
    icon: <FaFilm />,
  },
  {
    link: "/watched",
    text: "Watched Movies",
    icon: <FaStopwatch />,
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
