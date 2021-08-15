const partialAuth = ["master", "admin", "manager"]
const isAuth = role => {
  if (partialAuth.includes(role)) {
    return true;
  } else {
    return false;
  }
};

module.exports = isAuth