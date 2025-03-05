import config from "../config";
import { NavList } from "../types/NavTypes";

export const navData: NavList = [
  { id: 1, name: "Home", path: config.routes.HOME.PATH },
  { id: 2, name: "Blog", path: config.routes.BLOG.LISTING },
  { id: 3, name: "Single Post", path: "/single-blog-post/1" },
  { id: 4, name: "Contact", path: config.routes.INFO.CONTACT },
];
