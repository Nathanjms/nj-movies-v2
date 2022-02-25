import { FaHome, FaMusic, FaUser, FaUserGraduate } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

interface navItemsProps {
  link: string;
  text: string;
  icon: JSX.Element;
}

const navItems: navItemsProps[] = [
  {
    link: "/",
    text: "Home",
    icon: <FaHome />,
  },
  {
    link: "/about",
    text: "About",
    icon: <FaUser />,
  },
  {
    link: "/skills",
    text: "Skills",
    icon: <GiProgression />,
  },
  {
    link: "/test",
    text: "Education",
    icon: <FaUserGraduate />,
  },
  {
    link: "/music",
    text: "Music",
    icon: <FaMusic />,
  },
];

export default navItems;
