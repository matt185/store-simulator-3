import {normalAuth, partialAuth} from "./constants";

export const isAuthLite = (role: string) => {
  if (normalAuth.includes(role)) {
    return true;
  }
  return false;
};

export const isAuthMed = (role: string) => {
  if (partialAuth.includes(role)) {
    return true;
  }
  return false;
};
