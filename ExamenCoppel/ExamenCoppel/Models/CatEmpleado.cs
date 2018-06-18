using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Models
{
    public class CatEmpleado
    {
        public int EmpleadoID { get; set; }
        public string Nombre { get; set; }
        public int RolEmpleadoID { get; set; }
        public int TipoEmpleadoID { get; set; }
        public int Estatus { get; set; }

    }
}