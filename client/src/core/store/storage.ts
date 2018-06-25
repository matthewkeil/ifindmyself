interface LocalStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const localStorage: LocalStorage =
  window && window.localStorage
    ? (window.localStorage as LocalStorage)
    : {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined
      };

export default {
  getUser: () => {
    const localUser = localStorage.getItem("user");

    return localUser ? JSON.parse(localUser) : undefined;
  },
  setUser: (user?: any) =>
    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user")
};
