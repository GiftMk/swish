const normaliseRoute = (route: string): string => {
  let normalisedRoute = route;

  if (normalisedRoute.startsWith("/")) {
    normalisedRoute = normalisedRoute.slice(1);
  }

  if (normalisedRoute.endsWith("/")) {
    normalisedRoute = normalisedRoute.slice(0, normaliseRoute.length - 1);
  }

  return normalisedRoute.toLowerCase();
};

export const getFullRoute = (baseRoute: string, route: string): string => {
  const separator = route.length ? "/" : "";
  return `/${normaliseRoute(baseRoute)}${separator}${normaliseRoute(route)}`;
};
