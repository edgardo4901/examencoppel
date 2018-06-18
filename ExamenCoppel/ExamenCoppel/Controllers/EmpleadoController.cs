using ExamenCoppel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ExamenCoppel.Controllers
{
    public class EmpleadoController : Controller
    {
        // GET: Empleado
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GuardarEmpleado(Models.CatEmpleado oEmpleado)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                string respuesta = Manager.CatEmpleado.GuardarEmpleado(oEmpleado);
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(true, respuesta) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        [HttpPost]
        public string EliminarEmpleado(int EmpleadoID)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                string respuesta = Manager.CatEmpleado.EliminarEmpleado(EmpleadoID);
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(true, respuesta) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        public string ConsultarEmpleado(int EmpleadoID)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                CatEmpleado dato = Manager.CatEmpleado.ConsultarEmpleado(EmpleadoID);
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, dato) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
    }
}