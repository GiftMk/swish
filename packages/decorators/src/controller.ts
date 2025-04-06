export const Controller = (baseRoute = "") => {
  return <T extends object>(target: T) => {};
};
