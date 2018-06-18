using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Models
{
    public class CatMovimiento
    {
        public int MovimientoID { get; set; }
        public int EmpleadoID { get; set; }
        public DateTime Fecha { get; set; }
        public int CantidadEntregas { get; set; }
        public int CubrioTurno { get; set; }
        public int CubrioRolEmpleadoID { get; set; }
        public string FechaS { get; set; }
    }
}