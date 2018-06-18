using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Manager
{
    public class CatMovimiento
    {
        public static string GuardarMovimiento(Models.CatMovimiento oMovimiento)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatMovimientoSave]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(oMovimiento.MovimientoID, DbType.Int32, "@MovimientoID");
                    command.AddParameter(oMovimiento.EmpleadoID, DbType.Int32, "@EmpleadoID");
                    command.AddParameter(oMovimiento.Fecha, DbType.DateTime, "@Fecha");
                    command.AddParameter(oMovimiento.CantidadEntregas, DbType.Int32, "@CantidadEntregas");
                    command.AddParameter(oMovimiento.CubrioTurno, DbType.Int32, "@CubrioTurno");
                    command.AddParameter(oMovimiento.CubrioRolEmpleadoID, DbType.Int32, "@CubrioRolEmpleadoID");
                    IDbDataParameter respuesta = command.AddParameter(false, DbType.String, "@Respuesta", true);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        return respuesta.Value.ToString();
                    }

                }
            }
        }
        public static string EliminarMovimiento(Models.CatMovimiento oMovimiento)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatMovimientoDelete]";
                    command.CommandType = CommandType.StoredProcedure;
                    
                    command.AddParameter(oMovimiento.EmpleadoID, DbType.Int32, "@EmpleadoID");
                    command.AddParameter(oMovimiento.Fecha, DbType.DateTime, "@Fecha");
                    IDbDataParameter respuesta = command.AddParameter(false, DbType.String, "@Respuesta", true);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        return respuesta.Value.ToString();
                    }

                }
            }
        }
        public static Models.CatMovimiento ConsultarMovimiento(Models.CatMovimiento oMovimiento)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatMovimientoSelect]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(oMovimiento.EmpleadoID, DbType.Int32, "@EmpleadoID");
                    command.AddParameter(oMovimiento.Fecha, DbType.DateTime, "@Fecha");
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        Models.CatMovimiento elemento = new Models.CatMovimiento();
                        while (reader.Read())
                        {
                            elemento.MovimientoID = int.Parse(reader["MovimientoID"].ToString());
                            elemento.EmpleadoID = int.Parse(reader["EmpleadoID"].ToString());
                            elemento.Fecha = DateTime.Parse(reader["Fecha"].ToString());
                            elemento.CantidadEntregas = int.Parse(reader["CantidadEntregas"].ToString());
                            elemento.CubrioTurno = int.Parse(reader["CubrioTurno"].ToString());
                            elemento.CubrioRolEmpleadoID = int.Parse(reader["CubrioRolEmpleadoID"].ToString());
                            elemento.FechaS = reader["Fecha"].ToString();
                        }
                        return elemento;
                    }

                }
            }
        }
    }
}