using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Models
{
    public class EmpleadoNomina
    {
        public int EmpleadoID { get; set; }
        public string Nombre { get; set; }
        public string RolEmpleado { get; set; }
        public string TipoEmpleado { get; set; }
        public int CantidadEntregas { get; set; }
        public decimal SueldoMensual { get; set; }
        public decimal BonoHorasMensual { get; set; }
        public decimal BonoEntregas { get; set; }
        public decimal BonoHorasCubrir { get; set; }
        public decimal DescuentoHorasFaltas { get; set; }
        public decimal BonoValeDespensa { get; set; }
        public decimal RetencionISR { get; set; }
        public decimal SueldoBrutoMensual { get; set; }
        public decimal SueldoNetoMensual { get; set; }
    }
}