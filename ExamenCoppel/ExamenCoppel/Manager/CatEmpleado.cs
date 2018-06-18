using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Manager
{
    public class CatEmpleado
    {
        public static string GuardarEmpleado(Models.CatEmpleado oEmpleado)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {
                    
                    command.CommandText = "[CatEmpleadoSave]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(oEmpleado.EmpleadoID, DbType.Int32, "@EmpleadoID");
                    command.AddParameter(oEmpleado.Nombre, DbType.String, "@Nombre");
                    command.AddParameter(oEmpleado.RolEmpleadoID, DbType.Int32, "@RolEmpleadoID");
                    command.AddParameter(oEmpleado.TipoEmpleadoID, DbType.Int32, "@TipoEmpleadoID");
                    IDbDataParameter respuesta = command.AddParameter(false, DbType.String, "@Respuesta", true);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        return respuesta.Value.ToString();
                    }

                }
            }
        }
        public static string EliminarEmpleado(int EmpleadoID)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatEmpleadoDelete]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(EmpleadoID, DbType.Int32, "@EmpleadoID");
                    IDbDataParameter respuesta = command.AddParameter(false, DbType.String, "@Respuesta", true);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        return respuesta.Value.ToString();
                    }

                }
            }
        }
        public static Models.CatEmpleado ConsultarEmpleado(int EmpleadoID)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatEmpleadoSelect]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(EmpleadoID, DbType.Int32, "@EmpleadoID");
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        Models.CatEmpleado elemento = new Models.CatEmpleado();
                        while (reader.Read())
                        {
                            elemento.EmpleadoID = int.Parse(reader["EmpleadoID"].ToString());
                            elemento.Nombre = reader["Nombre"].ToString();
                            elemento.RolEmpleadoID = int.Parse(reader["RolEmpleadoID"].ToString());
                            elemento.TipoEmpleadoID = int.Parse(reader["TipoEmpleadoID"].ToString());
                        }
                        return elemento;
                    }

                }
            }
        }
    }
}