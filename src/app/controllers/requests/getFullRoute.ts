export const getFullRoute = (baseRoute: string, route: string): string => {
	const cleanedBaseRoute = baseRoute.endsWith('/')
		? baseRoute.slice(0, baseRoute.length - 1)
		: baseRoute
	const cleanedRoute = route.startsWith('/') ? route.slice(1) : route

	return `${cleanedBaseRoute}/${cleanedRoute}`
}
