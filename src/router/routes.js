const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue"), name: "home" },
      {
        path: "/login",
        component: () => import("pages/Login.vue"),
        name: "login",
        meta: { onlyGuest: true },
      },
      {
        path: "/register",
        component: () => import("pages/Register.vue"),
        name: "register",
        meta: { onlyGuest: true },
      },
      {
        path: "/user",
        component: () => import("pages/User.vue"),
        name: "user",
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
