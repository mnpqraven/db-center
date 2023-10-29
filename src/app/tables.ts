interface RouteItem {
  category: { name: string; route: string };
  tables: {
    name: string;
    route: string;
    api?: string[];
  }[];
}

export const routeDict: RouteItem[] = [
  {
    category: {
      name: "Honkai",
      route: "honkai",
    },
    tables: [
      { name: "Characters", route: "avatars", api: ["list"] },
      { name: "Skills", route: "skills", api: ["list"] },
      { name: "Items", route: "items" },
    ],
  },
];
