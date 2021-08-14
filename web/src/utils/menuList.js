let menuList = [
  {
    name: "Home",
    link: "/",
    icon: "house-door",
    visibility: "isLogged",
  },
  {
    name: "Manager",
    link: "/manage-view",
    icon: "command",
    visibility: "auth",
  },
  {
    name: "Settings",
    link: "/about",
    icon: "gear",
    visibility: true,
  },
  {
    name: "Signin/Signup",
    link: "/login",
    icon: "box-arrow-in-right",
    visibility: "!isLogged",
  },
  {
    name: "Logout",
    link: "/",
    icon: "box-arrow-in-left",
    visibility: "isLogged",
  },
];

module.exports = menuList;
