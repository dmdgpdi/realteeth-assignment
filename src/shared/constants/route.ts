export const ROUTES = {
  HOME: "/",
  DETAIL: ({ lon, lat, name }: { lon: number; lat: number; name?: string }) => {
    const params = new URLSearchParams();
    params.set("lon", lon.toString());
    params.set("lat", lat.toString());
    if (name) {
      params.set("name", name);
    }
    return `/detail?${params.toString()}`;
  },
  SEARCH: "/search",
};
