import { lazy } from "react";
import { Route } from "react-router-dom";


const Encandrant_list_page = lazy(() => import("../../pages/encandrant/Encandrant_list_page"));
const Encandrant_add_page = lazy(() => import("../../pages/encandrant/Encandrant_ad_page"));

export const encandrant_routes_items = {
 
  encandrant: {
    path: "encandrant",
    name: "Liste des encadreurs",
    component: Encandrant_list_page
  },
  add_encandrant: {
    path: "encandrant/add",
    name: "Nouveau encandrant",
    component: Encandrant_add_page
  },
}
var encandrant_routes = []
for (let key in encandrant_routes_items) {
  const route = encandrant_routes_items[key]
  encandrant_routes.push(<Route path={route.path} Component={route.component} key={route.path} />)
}

export default encandrant_routes