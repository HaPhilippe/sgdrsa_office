import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setBreadCrumbItemsAction, setToastAction } from "../../store/actions/appActions"
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import moment from "moment";
import fetchApi from "../../helpers/fetchApi";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import wait from "../../helpers/wait";
import Loading from "../../components/app/Loading";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { encandrant_routes_items } from "../../routes/rapport_stage/encandrant_routes";

const initialForm = {
  NOM: '',
  PRENOM: '',
  EMAIL: '',
  TITRE: '',
  TEL: ''
};

export default function Encandrant_list_page() {
  const dispacth = useDispatch()
  const [data, handleChange, setData, setValue] = useForm(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const [nbreindex, setNbrIndex] = useState(0)
  // console.log(nbreindex + 2, 'nbreindex');

  const { hasError, getError, setErrors, getErrors, checkFieldData, isValidate, setError } = useFormErrorsHandle(data, {

    NOM: {
      required: true,
      length: [1, 50],
      alpha: true
    },
    PRENOM: {
      required: true,
      length: [1, 50],
      alpha: true
    },
    EMAIL: {
      required: true,
      length: [1, 100],
      alpha: true
    },
    TITRE: {
      required: true,
      length: [1, 50],
      alpha: true
    },
    TEL: {
      required: true,
      length: [1, 20],
      alpha: true
    },


  }, {
    NOM: {
      required: "Ce champ est obligatoire",
      length: "Le nom ne doit etre depasser max(50 carateres)",
      alpha: "Le nom est invalide"
    },
    PRENOM: {
      required: "Ce champ est obligatoire",
      length: "Le prenom ne doit etre depasser max(100 carateres)",
      alpha: "Le prenom est invalide"
    },
    EMAIL: {
      required: "Ce champ est obligatoire",
      length: "Le email ne doit etre depasser max(100 carateres)",
      alpha: "Le email est invalide"
    },
    TITRE: {
      required: "Ce champ est obligatoire",
      length: "Le titre ne doit etre depasser max(50 carateres)",
      alpha: "Le titre est invalide"
    },
    TEL: {
      required: "Ce champ est obligatoire",
      length: "Le telephone ne doit etre depasser max(20 chiffres)",
      alpha: "Le numero de telephone est invalide"
    }
  })



  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (isValidate()) {
        setIsSubmitting(true)
        const form = new FormData()
        form.append("NOM", data.NOM);
        form.append("PRENOM", data.PRENOM);
        form.append("EMAIL", data.EMAIL);
        form.append("TITRE", data.TITRE);
        form.append("TEL", data.TEL);

        const res = await fetchApi(`/rapport_stage/encadrant/create?`, {
          method: 'POST',
          body: form
        })

        dispacth(
          setToastAction({
            severity: "success",
            summary: 'Encadrant enregistré',
            detail: "L'encadreur a été enregistré avec succès",
            life: 3000,
          })
        );
        navigate('/encandrant')
      }
      else {
        console.log(getErrors())
        setErrors(getErrors());
        dispacth(
          setToastAction({
            severity: "error",
            summary: 'La validation des données a échouée',
            detail: 'Veuillez corriger les erreurs mentionnées pour continuer',
            life: 3000,
          })
        );
        await wait(500)
        const header = document.querySelector('header')
        const nav = document.querySelector('nav')
        const firstErrorElement = document.querySelector(".p-invalid")
        if (firstErrorElement) {
          var headerHeight = 0
          if (header) headerHeight += header.offsetHeight
          if (nav) headerHeight += nav.offsetHeight
          const scrollPosition = firstErrorElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }

      }
    }
    catch (error) {
      console.log(error)
      if (error.httpStatus == "UNPROCESSABLE_ENTITY") {
        setErrors(error.result);
        dispacth(setToastAction({
          severity: 'error',
          summary: 'Erreur du système',
          detail: 'Erreur du système, réessayez plus tard',
          life: 3000
        }));
        await wait(500)
        const header = document.querySelector('header')
        const nav = document.querySelector('nav')
        const firstErrorElement = document.querySelector(".p-invalid")
        if (firstErrorElement) {
          var headerHeight = 0
          if (header) headerHeight += header.offsetHeight
          if (nav) headerHeight += nav.offsetHeight
          const scrollPosition = firstErrorElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      } else {
        dispacth(setToastAction({
          severity: 'error',
          summary: 'Erreur du système',
          detail: 'Erreur du système, réessayez plus tard',
          life: 3000
        }));
      }

    } finally {
      setIsSubmitting(false)
    }
  }



  useEffect(() => {
    dispacth(setBreadCrumbItemsAction([
      encandrant_routes_items.encandrant,
      encandrant_routes_items.add_encandrant,
    ]))
    return () => {
      dispacth(setBreadCrumbItemsAction([]))
    }
  }, [])


  const invalidClass = name => hasError(name) ? 'is-invalid' : ''
  return (
    <>
      {isSubmitting ? <Loading /> : null}
      <div className="px-4 py-3 main_content bg-white has_footer">
        <div className="">
          <h4 className="mb-3">Nouveau encadrant</h4>
          <hr className="w-100" />
        </div>



        <form className="form w-100 mt-6" onSubmit={handleSubmit}>

          <div className="form-group col-sm mt-5">
            <div className="row align-items-center">

              <div className="col-md-6">
                <label htmlFor="NOM" className="label mb-1">Nom</label>
                <InputText
                  type="text"
                  placeholder="Ecrire la faculté"
                  id="NOM"
                  name="NOM"
                  value={data.NOM}
                  onChange={handleChange}
                  onBlur={checkFieldData}
                  className={`w-100 ${hasError("NOM") ? "p-invalid" : ""}`}
                />
                <div className="invalid-feedback" style={{ minHeight: 21, display: "block" }}>
                  {hasError("NOM") ? getError("NOM") : ""}
                </div>
              </div>


              <div className="col-md-6">
                <label htmlFor="PRENOM" className="label mb-1">Prenom</label>
                <InputText
                  type="text"
                  placeholder="Ecrire le prenom"
                  id="PRENOM"
                  name="PRENOM"
                  value={data.PRENOM}
                  onChange={handleChange}
                  onBlur={checkFieldData}
                  className={`w-100 ${hasError("PRENOM") ? "p-invalid" : ""}`}
                />
                <div className="invalid-feedback" style={{ minHeight: 21, display: "block" }}>
                  {hasError("PRENOM") ? getError("PRENOM") : ""}
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="EMAIL" className="label mb-1">Email</label>
                <InputText
                  type="text"
                  placeholder="Ecrire le email"
                  id="EMAIL"
                  name="EMAIL"
                  value={data.EMAIL}
                  onChange={handleChange}
                  onBlur={checkFieldData}
                  className={`w-100 ${hasError("EMAIL") ? "p-invalid" : ""}`}
                />
                <div className="invalid-feedback" style={{ minHeight: 21, display: "block" }}>
                  {hasError("EMAIL") ? getError("EMAIL") : ""}
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="TITRE" className="label mb-1">Titre</label>
                <InputText
                  type="text"
                  placeholder="Ecrire son titre"
                  id="TITRE"
                  name="TITRE"
                  value={data.TITRE}
                  onChange={handleChange}
                  onBlur={checkFieldData}
                  className={`w-100 ${hasError("TITRE") ? "p-invalid" : ""}`}
                />
                <div className="invalid-feedback" style={{ minHeight: 21, display: "block" }}>
                  {hasError("TITRE") ? getError("TITRE") : ""}
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="TEL" className="label mb-1">Telephone</label>
                <InputText
                  type="text"
                  placeholder="Ecrire son numero de téléphone"
                  id="TEL"
                  name="TEL"
                  value={data.TEL}
                  onChange={handleChange}
                  onBlur={checkFieldData}
                  className={`w-100 ${hasError("TEL") ? "p-invalid" : ""}`}
                />
                <div className="invalid-feedback" style={{ minHeight: 21, display: "block" }}>
                  {hasError("TEL") ? getError("TEL") : ""}
                </div>
              </div>


            </div>

          </div>

          <div
            style={{ position: "absolute", bottom: 0, right: 0 }}
            className="w-100 d-flex justify-content-end shadow-4 pb-3 pr-5 bg-white"
          >
            <Button
              label="Reinitialiser"
              type="reset"
              outlined
              className="mt-3"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setData(initialForm);
                setErrors({});
              }}
            />


            <Button
              label="Envoyer"
              type="submit"
              className="mt-3 ml-3"
              size="small"
              disabled={isSubmitting}
            />
          </div>
        </form >

      </div >
    </>
  )
}


