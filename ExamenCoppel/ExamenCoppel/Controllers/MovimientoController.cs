using ExamenCoppel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ExamenCoppel.Controllers
{
    public class MovimientoController : Controller
    {
        // GET: Movimiento
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GuardarMovimiento(Models.CatMovimiento oMovimiento)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                string respuesta = Manager.CatMovimiento.GuardarMovimiento(oMovimiento);
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(true, respuesta) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        [HttpPost]
        public string EliminarMovimiento(Models.CatMovimiento oMovimiento)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                string respuesta = Manager.CatMovimiento.EliminarMovimiento(oMovimiento);
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(true, respuesta) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
        [HttpPost]
        public string ConsultarMovimiento(Models.CatMovimiento oMovimiento)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                Models.CatMovimiento respuesta = Manager.CatMovimiento.ConsultarMovimiento(oMovimiento);
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, respuesta) });
            }
            catch (Exception e)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, e.Message) });
            }
        }
    }
}