using ExamenCoppel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ExamenCoppel.Controllers
{
    public class CatalogoController : Controller
    {
        [HttpPost]
        public string ConsultarRolesEmpleado()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<Models.CatRolEmpleado> listaDatos = Manager.Catalogos.ConsultarRolesEmpleado();
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, listaDatos) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        [HttpPost]
        public string ConsultarTiposEmpleado()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<Models.CatTipoEmpleado> listaDatos = Manager.Catalogos.ConsultarTiposEmpleado();
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, listaDatos) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        [HttpPost]
        public string ConsultarEmpleados(int EmpleadoID)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<Models.CatEmpleado> listaDatos = Manager.CatEmpleado.ConsultarEmpleados(EmpleadoID);
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, listaDatos) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
    }
}