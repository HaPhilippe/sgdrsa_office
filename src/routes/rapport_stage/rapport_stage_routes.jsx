import { lazy } from "react";
import { Route } from "react-router-dom";


const Faculte_departements_list_page = lazy(() => import("../../pages/faculte_departements/Faculte_departements_list_page"));
const Faculte_departements_add_page = lazy(() => import("../../pages/faculte_departements/Faculte_departements_ad_page"));
 

export const rapport_stage_routes_items = {
 
  facultedep: {
    path: "facultedep",
    name: "Liste facultes",
    component: Faculte_departements_list_page
  },
  add_facultedep: {
    path: "facultedepartement/add",
    name: "Nouvelle faculte",
    component: Faculte_departements_add_page
  },
}
var rapport_stage_routes = []
for (let key in rapport_stage_routes_items) {
  const route = rapport_stage_routes_items[key]
  rapport_stage_routes.push(<Route path={route.path} Component={route.component} key={route.path} />)
}

export default rapport_stage_routes