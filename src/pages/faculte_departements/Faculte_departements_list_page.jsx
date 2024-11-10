// import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   setBreadCrumbItemsAction,
//   setToastAction,
// } from "../../store/actions/appActions";
// import { administration_routes_items } from "../../routes/admin/administration_routes";
// import { welcome_routes_items } from "../../routes/welcome/welcome_routes";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { Dialog } from 'primereact/dialog';
// import moment from "moment";
// import fetchApi from "../../helpers/fetchApi";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { SlideMenu } from "primereact/slidemenu";
// import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// import Loading from "../../components/app/Loading";
// import { Image } from "primereact/image";
// import { InputSwitch } from 'primereact/inputswitch';
// import "../../styles/app1/style.css"
// import { rapport_stage_routes_items } from "../../routes/rapport_stage/rapport_stage_routes";

// const UtilisateurSwitch = ({ utilisateur, change_status }) => {
//   const [checked, setChecked] = useState(false)
//   useEffect(() => {
//     if (utilisateur?.IS_ACTIF) {
//       setChecked(true)
//     } else {
//       setChecked(false)
//     }
//   }, [utilisateur])
//   return (
//     <InputSwitch checked={checked} onChange={(e) => {
//       e.preventDefault()
//       e.stopPropagation()
//       setChecked(e.value)
//       change_status(null, utilisateur?.ID_UTILISATEUR)
//     }} />
//   )
// }

// const UtilisateurSwitchNotEdit = ({ utilisateur, change_status }) => {
//   const [checked, setChecked] = useState(false)
//   useEffect(() => {
//     if (utilisateur?.IS_ACTIF) {
//       setChecked(true)
//     } else {
//       setChecked(false)
//     }
//   }, [utilisateur])
//   return (
//     <InputSwitch checked={checked} />
//   )
// }


// export default function Utilisateur_liste_page() {
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [date, setDate] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [totalRecords, setTotalRecords] = useState(1);
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [details_modalUsers, setDetails_modalUsers] = useState(false);
//   const [detail_users, setDetail_users] = useState(null);


//   const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
//   const paginatorRight = <Button type="button" icon="pi pi-download" text />;
//   const [selectedItems, setSelectedItems] = useState(null);
//   const menu = useRef(null);
//   const [inViewMenuItem, setInViewMenuItem] = useState(null);
//   const [globalLoading, setGloabalLoading] = useState(false);

//   const [visibleStatut, setVisibleStatut] = useState(false);

//   const navigate = useNavigate();

//   const [lazyState, setlazyState] = useState({
//     first: 0,
//     rows: 10,
//     page: 1,
//     sortField: null,
//     sortOrder: null,
//     search: "",
//     filters: {
//       name: { value: "", matchMode: "contains" },
//       "country.name": { value: "", matchMode: "contains" },
//       company: { value: "", matchMode: "contains" },
//       "representative.name": { value: "", matchMode: "contains" },
//     },
//   });

//   const dispacth = useDispatch();
//   const handleVisibility = (e) => {
//     setIsVisible(!isVisible);
//   };
//   const onPage = (event) => {
//     setlazyState(event);
//   };

//   const onSort = (event) => {
//     setlazyState(event);
//   };

//   const onFilter = (event) => {
//     event["first"] = 0;
//     setlazyState(event);
//   };

//   const onSelectionChange = (event) => {
//     const value = event.value;
//     setSelectedItems(value);
//     setSelectAll(value.length === totalRecords);
//   };

//   const onSelectAllChange = (event) => {
//     const selectAll = event.checked;

//     if (selectAll) {
//       setSelectAll(true);
//       setSelectedItems(utilisateurs);
//     } else {
//       setSelectAll(false);
//       setSelectedItems([]);
//     }
//   };

//   const deleteItems = async (itemsIds) => {
//     try {
//       setGloabalLoading(true);
//       const form = new FormData();
//       form.append("ids", JSON.stringify(itemsIds));
//       const res = await fetchApi("/administration/utilisateurs/detele_utilisateurs", {
//         method: "POST",
//         body: form,
//       });
//       dispacth(
//         setToastAction({
//           severity: "success",
//           summary: "Utilisateur supprimé",
//           detail: "L'utilisateur a été supprimé avec succès",
//           life: 3000,
//         })
//       );
//       fetchUtilisateurs();
//       setSelectAll(false);
//       setSelectedItems(null);
//     } catch (error) {
//       console.log(error);
//       dispacth(
//         setToastAction({
//           severity: "error",
//           summary: "Erreur du système",
//           detail: "Erreur du système, réessayez plus tard",
//           life: 3000,
//         })
//       );
//     } finally {
//       setGloabalLoading(false);
//     }
//   };

//   const handleDeletePress = (e, itemsIds) => {
//     e.preventDefault();
//     e.stopPropagation();
//     confirmDialog({
//       headerStyle: { backgroundColor: '#ecc5c5', backgroundSize: 'cover' },
//       headerClassName: "text-black",
//       header: "Supprimer ?",
//       message: (
//         <div className="d-flex flex-column align-items-center">

//           {inViewMenuItem ? (
//             <>
//             <img
//             alt="flag"
//             src={inViewMenuItem.IMAGE}
//             className={`rounded object-fit-cover`}
//             style={{ width: "100px", height: "100px" }}
//           />
//               <div className="font-bold text-center my-2">
//                 {inViewMenuItem?.NOM} {inViewMenuItem?.PRENOM}
//               </div>
//               <div className="text-center">
//                 Voulez-vous vraiment supprimer ?
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="text-muted">
//                 {selectedItems ? selectedItems.length : "0"} selectionné
//                 {selectedItems?.length > 1 && "s"}
//               </div>
//               <div className="text-center">
//                 Voulez-vous vraiment supprimer les éléments selectionnés ?
//               </div>
//             </>
//           )}
//         </div>
//       ),
//       acceptClassName: "p-button-danger",
//       acceptLabel: "Oui",
//       rejectLabel: "Non",
//       accept: () => {
//         deleteItems(itemsIds);
//       },
//     });
//   };

//   //fonction pour rendre active et desactive


//   const change_status = async (e, ID_UTILISATEUR) => {
//     try {
//       setGloabalLoading(true);
//       await fetchApi(
//         `/administration/utilisateurs/change_statuts/${ID_UTILISATEUR}`,
//         {
//           method: "PUT",
//         }
//       );
//       fetchUtilisateurs();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setGloabalLoading(false);
//       // menu.current.hide(e);
//     }
//   };

//   const fetchUtilisateurs = useCallback(async () => {
//     try {
//       setLoading(true);
//       const baseurl = `/administration/utilisateurs/fetch?`;
//       var url = baseurl;
//       for (let key in lazyState) {
//         const value = lazyState[key];
//         if (value) {
//           if (typeof value == "object") {
//             url += `${key}=${JSON.stringify(value)}&`;
//           } else {
//             url += `${key}=${value}&`;
//           }
//         }
//       }
//       const res = await fetchApi(url);

//       setUtilisateurs(res.result.data);
//       setTotalRecords(res.result.totalRecords);

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [lazyState]);



//   useEffect(() => {
//     dispacth(setBreadCrumbItemsAction([rapport_stage_routes_items.facultedep]));
//     return () => {
//       dispacth(setBreadCrumbItemsAction([]));
//     };
//   }, []);



//   useEffect(() => {
//     fetchUtilisateurs();
//   }, [lazyState]);
//   return (
//     <>
//       <ConfirmDialog closable dismissableMask={true} />
//       {globalLoading && <Loading />}
//       <div className="px-4 py-3 main_content">
//         <div className="d-flex align-items-center justify-content-between">
//           <h4 className="mb-3">Faculté</h4>
//           <Button
//             label="Nouveau"
//             icon="pi pi-plus"
//             size="small"
//             onClick={() => {
//               navigate("/facultedepartement/add");
//             }}
//           />
//         </div>
//         <div className="shadow my-2 bg-white p-3 rounded d-flex align-items-center justify-content-between">
//           <div className="d-flex  align-items-center">
//             <div className="p-input-icon-left">
//               <i className="pi pi-search" />
//               <InputText
//                 type="search"
//                 placeholder="Recherche"
//                 className="p-inputtext-sm"
//                 style={{ minWidth: 300 }}
//                 onInput={(e) =>
//                   setlazyState((s) => ({ ...s, search: e.target.value }))
//                 }
//               />
//             </div>

//           </div>
//           <div className="selection-actions d-flex align-items-center">
//             <div className="text-muted mx-3">
//               {selectedItems ? selectedItems.length : "0"} selectionné
//               {selectedItems?.length > 1 && "s"}
//             </div>
//             <a
//               href="#"
//               className={`p-menuitem-link link-dark text-decoration-none ${(!selectedItems || selectedItems?.length == 0) &&
//                 "opacity-50 pointer-events-none"
//                 }`}
//               style={{}}
//               onClick={(e) =>
//                 handleDeletePress(
//                   e,
//                   selectedItems.map((item) => item.ID_UTILISATEUR)
//                 )
//               }
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-trash"
//                 viewBox="0 0 16 16"
//                 style={{ marginRight: "0.3rem" }}
//               >
//                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
//                 <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
//               </svg>
//               <span className="p-menuitem-text">Supprimer</span>
//             </a>
//           </div>
//         </div>
//         <div className="content">
//           <div className="shadow rounded mt-3 pr-1 bg-white">
//             <DataTable
//               lazy
//               value={utilisateurs}
//               tableStyle={{ minWidth: "50rem" }}
//               className=""
//               paginator
//               rowsPerPageOptions={[5, 10, 25, 50]}
//               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//               currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
//               emptyMessage="Aucun utilisateurs trouvé"
//               // paginatorLeft={paginatorLeft}
//               // paginatorRight={paginatorRight}
//               first={lazyState.first}
//               rows={lazyState.rows}
//               totalRecords={totalRecords}
//               onPage={onPage}
//               onSort={onSort}
//               sortField={lazyState.sortField}
//               sortOrder={lazyState.sortOrder}
//               onFilter={onFilter}
//               filters={lazyState.filters}
//               loading={loading}
//               selection={selectedItems}
//               onSelectionChange={onSelectionChange}
//               selectAll={selectAll}
//               onSelectAllChange={onSelectAllChange}
//               reorderableColumns
//               resizableColumns
//               columnResizeMode="expand"
//               paginatorClassName="rounded"
//               scrollable
//             // size="normal"
//             >
//               <Column
//                 selectionMode="multiple"
//                 frozen
//                 headerStyle={{ width: "3rem" }}
//               />

//               <Column
//                 field="IMAGE"
//                 header="Utilisateurs"
//                 frozen
//                 sortable
//                 body={(item) => {
//                   const css = `
//                             .round-indicator .p-image-preview-indicator {
//                             border-radius: 50%
//                             }`;
//                   return (
//                     <>
//                       <div className="d-flex round-indicator">
//                         <Image
//                           src={item.IMAGE}
//                           alt="Image"
//                           className="rounded-5"
//                           imageClassName="rounded-5 object-fit-cover"
//                           imageStyle={{ width: "50px", height: "50px" }}
//                           style={{ width: "50px", height: "50px" }}
//                           preview
//                         />
//                         <div className="ml-2">
//                           <div className="font-bold">
//                             {item.NOM} {item.PRENOM}
//                           </div>
//                           <div className="text-muted">{item.TELEPHONE}</div>
//                         </div>
//                       </div>
//                       <style>{css}</style>
//                     </>
//                   );
//                 }}
//               />

//               <Column
//                 field="EMAIL"
//                 header="Email"
//                 sortable
//                 body={(item) => item.EMAIL}
//               />
//               <Column
//                 field="DESCRIPTION"
//                 header="Profil"
//                 sortable
//                 body={(item) => item.PROFIL.DESCRIPTION}
//               />
//               <Column
//                 field="IS_ACTIF"
//                 header="Etat"
//                 frozen
//                 sortable
//                 body={(item) => {
//                   return (
//                     <>
//                       <UtilisateurSwitch utilisateur={item} change_status={change_status} />
//                       {/* <UtilisateurSwitchNotEdit utilisateur={item} /> */}
//                     </>
//                   );
//                 }}
//               />
//               <Column
//                 field="DATE_INSERTION"
//                 header="Date d'insertion"
//                 sortable
//                 body={(item) => {
//                   return moment(item.DATE_INSERTION).format("DD/MM/YYYY HH:ss");
//                 }}
//               />
//               <Column
//                 field=""
//                 header=""
//                 alignFrozen="right"
//                 frozen
//                 body={(item) => {
//                   const items = [

//                     {
//                       template: (deleteItem, options) => {
//                         return (
//                           <Link
//                             to={`/utilisateurs/edit/${inViewMenuItem?.ID_UTILISATEUR}`}
//                             className="p-menuitem-link"

//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="currentColor"
//                               className="bi bi-pencil-square"
//                               viewBox="0 0 16 16"
//                               style={{ marginRight: "0.5rem" }}
//                             >
//                               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                               <path
//                                 fillRule="evenodd"
//                                 d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
//                               />
//                             </svg>
//                             <span className="p-menuitem-text">Modifier</span>
//                           </Link>
//                         );
//                       },
//                     },
//                     {
//                       template: (deleteItem, options) => {
//                         return (
//                           <a
//                             href="#"
//                             className="p-menuitem-link text-danger"
//                             onClick={(e) =>
//                               handleDeletePress(e, [
//                                 inViewMenuItem.ID_UTILISATEUR,
//                               ])
//                             }
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="currentColor"
//                               className="bi bi-trash"
//                               viewBox="0 0 16 16"
//                               style={{ marginRight: "0.5rem" }}
//                             >
//                               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
//                               <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
//                             </svg>
//                             <span className="p-menuitem-text text-danger">
//                               Supprimer
//                             </span>
//                           </a>
//                         );
//                       },
//                     },

//                     {
//                       template: (deleteItem, options) => {
//                         return inViewMenuItem?.IS_ACTIF ? (
//                           <a
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               change_status(e, inViewMenuItem.ID_UTILISATEUR);
//                             }}
//                             className="p-menuitem-link"
//                           >
//                             <span className="p-menuitem-text ">
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-off" viewBox="0 0 16 16"
//                                 style={{ marginRight: "0.5rem", transform: "scale(1.3)" }}>
//                                 <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
//                               </svg>
//                               Desactive
//                             </span>
//                           </a>
//                         ) : (
//                           <a
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               change_status(e, inViewMenuItem.ID_UTILISATEUR);
//                             }}
//                             className="p-menuitem-link"
//                           >
//                             <span className="p-menuitem-text ">
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-on" viewBox="0 0 16 16" style={{ marginRight: "0.5rem", transform: "scale(1.3)" }}>
//                                 <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
//                               </svg>
//                               Active
//                             </span>
//                           </a>
//                         );
//                       },
//                     },
//                   ];
//                   return (
//                     <>
//                       <SlideMenu
//                         ref={menu}
//                         model={items}
//                         popup
//                         viewportHeight={150}
//                         menuWidth={220}
//                         onHide={() => {
//                           setInViewMenuItem(null);
//                         }}
//                       />
//                       <Button
//                         rounded
//                         severity="secondary"
//                         text
//                         aria-label="Menu"
//                         size="small"
//                         className="mx-1"
//                         onClick={(event) => {

//                           setInViewMenuItem(item);
//                           setDetail_users(item)
//                           menu.current.toggle(event);
//                         }}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="currentColor"
//                           className="bi bi-three-dots"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
//                         </svg>
//                       </Button>

//                     </>
//                   );
//                 }}
//               />


//             </DataTable>
//           </div>
//         </div>
//       </div>
//       <Outlet />
//     </>
//   );
// }


import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbItemsAction, setToastAction, } from "../../store/actions/appActions";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import moment from "moment";
import fetchApi from "../../helpers/fetchApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SlideMenu } from "primereact/slidemenu";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Loading from "../../components/app/Loading";
import { Image } from "primereact/image";
import { InputSwitch } from 'primereact/inputswitch';
import { Tooltip } from 'primereact/tooltip';
// import avatar from '../../../public/images/avatar2.png'
// import commande from '../../../public/images/commande.png'
import statutCommandempColor from "../../helpers/statutCommandempColor";
// import etatLotproductionColor from "../../helpers/etatLotproductionColor";
import { rapport_stage_routes_items } from "../../routes/rapport_stage/rapport_stage_routes";

export default function Lot_production_list_page() {


  const [selectedCity, setSelectedCity] = useState(null);
  const [date, setDate] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1);
  const [faculteDepart, setFaculteDepart] = useState([]);
  console.log(faculteDepart);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const [selectedItems, setSelectedItems] = useState(null);
  const menu = useRef(null);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [globalLoading, setGloabalLoading] = useState(false);

  const [visibleStatut, setVisibleStatut] = useState(false);
  const [lastId, setLastId] = useState(null);

  const navigate = useNavigate();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    search: "",
    filters: {
      name: { value: "", matchMode: "contains" },
      "country.name": { value: "", matchMode: "contains" },
      company: { value: "", matchMode: "contains" },
      "representative.name": { value: "", matchMode: "contains" },
    },
  });

  const dispacth = useDispatch();
  const handleVisibility = (e) => {
    setIsVisible(!isVisible);
  };
  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setlazyState(event);
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedItems(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event) => {
    const selectAll = event.checked;

    if (selectAll) {
      setSelectAll(true);
      setSelectedItems(stockmp);
    } else {
      setSelectAll(false);
      setSelectedItems([]);
    }
  };

  const fetchFaculte_departement = useCallback(async () => {
    try {
      setLoading(true);
      const baseurl = `/rapport_stage/faculte_depar/fetch?`;
      var url = baseurl;
      for (let key in lazyState) {
        const value = lazyState[key];
        if (value) {
          if (typeof value == "object") {
            url += `${key}=${JSON.stringify(value)}&`;
          } else {
            url += `${key}=${value}&`;
          }
        }
      }
      const res = await fetchApi(url);
      setFaculteDepart(res.result.data);
      setTotalRecords(res.result.totalRecords);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {
    dispacth(setBreadCrumbItemsAction([rapport_stage_routes_items.facultedep]));
    return () => {
      dispacth(setBreadCrumbItemsAction([]));
    };
  }, []);



  useEffect(() => {
    fetchFaculte_departement();
  }, [lazyState]);




  const ComfirmeDialogForCreateLotProduction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    confirmDialog({
      headerStyle: { backgroundColor: '#ecc5c5', backgroundSize: 'cover' },
      headerClassName: "text-black",
      header: "Créer un lot production?",
      message: (
        <div className="d-flex flex-column align-items-center">
          <div className="text-center mt-5">
            Voulez-vous vraiment créer un lot production?
          </div>
        </div>
      ),

      acceptClassName: "p-button-danger",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        // fetchMaxLotProID();

        navigate("/facultedepartement/add");

      },
    });
  };


  return (
    <>
      <ConfirmDialog />
      {globalLoading && <Loading />}
      <div className="px-4 py-3 main_content">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-3">Faculté et departement</h1>
          <Button
            label="Nouveau"
            icon="pi pi-plus"
            size="small"
            onClick={(e) => {
              ComfirmeDialogForCreateLotProduction(e)
            }}
          />

        </div>
        <div className="shadow my-2 bg-white p-3 rounded d-flex align-items-center justify-content-between">
          <div className="d-flex  align-items-center">
            <div className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                type="search"
                placeholder="Recherche"
                className="p-inputtext-sm"
                style={{ minWidth: 300 }}
                onInput={(e) =>
                  setlazyState((s) => ({ ...s, search: e.target.value }))
                }
              />
            </div>

          </div>
          <div className="selection-actions d-flex align-items-center">
            <div className="text-muted mx-3">
              {selectedItems ? selectedItems.length : "0"} selectionné
              {selectedItems?.length > 1 && "s"}
            </div>
            <a
              href="#"
              className={`p-menuitem-link link-dark text-decoration-none ${(!selectedItems || selectedItems?.length == 0) &&
                "opacity-50 pointer-events-none"
                }`}
              style={{}}
              onClick={(e) =>
                handleDeletePress(e, selectedItems.map((item) => item.ID_FAC))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
                style={{ marginRight: "0.3rem" }}
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
              <span className="p-menuitem-text">Supprimer</span>
            </a>
          </div>
        </div>
        <div className="content">
          <div className="shadow rounded mt-3 pr-1 bg-white">
            <DataTable
              lazy
              value={faculteDepart}
              tableStyle={{ minWidth: "50rem" }}
              className=""
              paginator
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
              emptyMessage="Aucun lot production trouvé"
              // paginatorLeft={paginatorLeft}
              // paginatorRight={paginatorRight}
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRecords}
              onPage={onPage}
              onSort={onSort}
              sortField={lazyState.sortField}
              sortOrder={lazyState.sortOrder}
              onFilter={onFilter}
              filters={lazyState.filters}
              loading={loading}
              selection={selectedItems}
              onSelectionChange={onSelectionChange}
              selectAll={selectAll}
              onSelectAllChange={onSelectAllChange}
              reorderableColumns
              resizableColumns
              columnResizeMode="expand"
              paginatorClassName="rounded"
              scrollable
            // size="normal"
            >
              <Column
                selectionMode="multiple"
                frozen
                headerStyle={{ width: "3rem" }}
              />
              {/* 
              <Column
                field="IMAGE"
                header="Agent product"
                frozen
                sortable
                body={(item) => {
                  const css = `
                                .round-indicator .p-image-preview-indicator {
                                    border-radius: 50%;
                                }`;
                  return (
                    <>
                      {item.utilisateurs ?


                        <Tooltip target={`#custom-tooltip-btn_demd-${item.ID_DETAIL}`} className="w-4">
                          <div className="form-group col-md">
                            <div className="row d-flex">
                              {item.utilisateurs ?
                                <div className=" col-md-3 ml-1">
                                  <Image
                                    src={item.utilisateurs?.IMAGE || avatar}
                                    alt="Image"
                                    className="rounded-1"
                                    imageClassName="rounded-1 object-fit-cover"
                                    imageStyle={{ width: '150px', height: '150px' }}
                                    style={{ width: '150px', height: '150px' }}
                                    preview
                                  />
                                </div>
                                :
                                <div className=" col-md-3 ml-1">
                                  <Image
                                    src={avatar}
                                    alt="Image"
                                    className="rounded-1"
                                    imageClassName="rounded-1 object-fit-cover"
                                    imageStyle={{ width: '100px', height: '100px' }}
                                    style={{ width: '100px', height: '100px' }}
                                    preview
                                  />
                                </div>

                              }

                              <div className="col-sm ml-4">

                                <div className="form-group col-sm">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="" className="label mb-1">Nom & Prénom </label>
                                    </div>
                                    <div className="col-sm">
                                      :  {item?.utilisateurs?.NOM} {item?.utilisateurs?.PRENOM}
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group col-sm">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="" className="label mb-1">Email</label>
                                    </div>
                                    <div className="col-sm">
                                      :  {item?.utilisateurs?.EMAIL}
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group col-sm">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="" className="label mb-1">Profile</label>
                                    </div>
                                    <div className="col-sm">
                                      :  {item?.utilisateurs?.PROFIL?.DESCRIPTION ? item?.utilisateurs?.PROFIL?.DESCRIPTION : '-'}
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group col-sm">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="" className="label mb-1">Utilisateur ... </label>
                                    </div>
                                    <div className="col-sm">
                                      :   {item?.utilisateurs?.IS_ACTIF === 1 ?
                                        <span className="text-primary rounded-1 p-1">Actif</span> :
                                        <span className="text-danger rounded-1 p-1" >Inactif</span>
                                      }
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group col-sm">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="" className="label mb-1">Téléphone</label>
                                    </div>
                                    <div className="col-sm">
                                      :  {item?.utilisateurs?.TELEPHONE ? item?.utilisateurs?.TELEPHONE : '-'}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                        </Tooltip>
                        : ''}


                      <Link
                        id={`custom-tooltip-btn_demd-${item.ID_BON_COMM_MP}`}
                        className=" text-decoration-none d-flex round-indicator"
                        style={{ color: '#399af2' }}
                        to={`/utilisateurs/${item?.utilisateurs?.ID_UTILISATEUR}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        data-pr-position="bottom"
                      >
                        <div className="d-flex round-indicator">
                          <Image
                            src={item?.utilisateurs?.IMAGE || avatar}
                            alt="Image"
                            className="rounded-5"
                            imageClassName="rounded-5 object-fit-cover"
                            imageStyle={{ width: "40px", height: "40px" }}
                            style={{ width: "40px", height: "40px" }}
                            preview
                          />
                          <div className="ml-2 mt-1">
                            <div className="font-bold">
                              {item?.utilisateurs?.NOM} {item?.utilisateurs?.PRENOM}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <style>{css}</style>
                    </>
                  );
                }}
              /> */}

              <Column
                field="NOM"
                header="Faculté"
                frozen
                sortable
                body={(item) => {
                  const css = `
                            .round-indicator .p-image-preview-indicator {
                            border-radius: 50%
                            }`;
                  return (

                    <>
                      <Tooltip target={`#Nocmnde-${item.faculte.NOM}`} className="w-4">
                        <div className="form-group col-md">
                          <div className="row d-flex">
                            {/* <div className="col-md-3 ml-1">
                              <Image
                                src={commande}
                                alt="Image"
                                className="rounded-1"
                                imageClassName="rounded-1 object-fit-cover"
                                imageStyle={{ width: '100px', height: '100px' }}
                                style={{ width: '100px', height: '100px' }}
                              />
                            </div> */}
                            <div className="col-sm ml-1">
                              <div className="form-group col-sm">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label className="label mb-1">Faculté</label>
                                  </div>
                                  <div className="col-sm">: {item?.faculte.NOM}</div>
                                </div>
                              </div>
                              <div className="form-group col-sm">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label className="label mb-1">Date</label>
                                  </div>
                                  <div className="col-sm">: {moment(item.DATE_INSERTION).format("DD/MM/YYYY")}</div>
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>
                      </Tooltip>
                      <Link
                        id={`Nocmnde-${item?.ID_FAC
                          }`}
                        className="text-decoration-none d-flex round-indicator"
                        style={{ color: '#399af2' }}
                        to={`/facultedepartement/add/${item?.ID_FAC}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        data-pr-position="bottom"
                      >
                        <span>{item?.faculte?.NOM}</span>
                      </Link>
                    </>
                  );
                }}
              />


              <Column
                field="NOM_DEPARTEMENT"
                header="Département"
                sortable
                body={(item) => {
                  return (
                    // <span>{item.VALEUR ? parseInt(item.VALEUR).toLocaleString('fr-FR') : 0} Fbu</span>
                    <span>{item?.NOM_DEPARTEMENT
                    }</span>

                  );
                }}
              />
              <Column
                field="DESCRIPTION"
                header="Description"
                sortable
                body={(item) => {
                  return (
                    // <span>{item.VALEUR ? parseInt(item.VALEUR).toLocaleString('fr-FR') : 0} Fbu</span>
                    <span>{item?.faculte?.DESCRIPTION
                    }</span>

                  );
                }}
              />

              <Column
                field="DATE_INSERTION "
                header="Date "
                sortable
                body={(item) => {
                  return moment(item.DATE_INSERTION).format("DD/MM/YYYY");

                }}
              />
              {/* <Column
                field="ETAT "
                header="Etat"
                sortable
                body={(item) => {

                  return (
                    item?.ETAT == '1' ?
                      <Button className="btn-sm"
                        data-pr-tooltip='En brouillon'
                        tooltip tooltipOptions={{ position: 'top' }}
                        style={{
                          width: 35, height: 35, backgroundColor: etatLotproductionColor(
                            item.ETAT).backgroundColor,
                          color: etatLotproductionColor(item.ETAT
                          ).textColor, border: "none"
                        }}
                        icon={options => {
                          return <span className="mb-1"
                            dangerouslySetInnerHTML={{
                              __html: etatLotproductionColor(
                                item.ETAT).icon
                            }} />
                        }} />
                      :
                      <Button className="btn-sm"
                        data-pr-tooltip='Terminée'
                        tooltip tooltipOptions={{ position: 'top' }}
                        style={{
                          width: 35, height: 35, backgroundColor: etatLotproductionColor(
                            item.ETAT).backgroundColor,
                          color: etatLotproductionColor(item.ETAT
                          ).textColor, border: "none"
                        }}
                        icon={options => {
                          return <span className="mb-1"
                            dangerouslySetInnerHTML={{
                              __html: etatLotproductionColor(
                                item.ETAT).icon
                            }} />
                        }} />

                  );


                }}
              /> */}

            </DataTable>
          </div>
        </div >
      </div >
      <Outlet />
    </>
  );

}
