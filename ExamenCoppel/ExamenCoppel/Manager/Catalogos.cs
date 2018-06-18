using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ExamenCoppel.Manager
{
    public class Catalogos
    {
        public static List<Models.CatTipoEmpleado> ConsultarTiposEmpleado()
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatTipoEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    int Estatus = 0;
                    command.CommandText = "[CatTipoEmpleadoSelect]";
                    command.CommandType = CommandType.StoredProcedure;

                    //command.AddParameter(Estatus, DbType.Int16, "@Estatus");
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        //result.hasError = Convert.ToByte(hasError.Value);
                        while (reader.Read())
                        {
                            Models.CatTipoEmpleado elemento = new Models.CatTipoEmpleado();
                            elemento.TipoEmpleadoID = int.Parse(reader["TipoEmpleadoID"].ToString());
                            elemento.Descripcion = reader["Descripcion"].ToString();
                            result.Add(elemento);
                        }
                    }

                }
                return result;
            }
        }
        public static List<Models.CatRolEmpleado> ConsultarRolesEmpleado()
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatRolEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    int Estatus = 0;
                    command.CommandText = "[CatRolEmpleadoSelect]";
                    command.CommandType = CommandType.StoredProcedure;
                    connection.Open();
                    
                    using (var reader = command.ExecuteReader())
                    {
                        //result.hasError = Convert.ToByte(hasError.Value);
                        while (reader.Read())
                        {
                            Models.CatRolEmpleado elemento = new Models.CatRolEmpleado();
                            elemento.RolEmpleadoID = int.Parse(reader["RolEmpleadoID"].ToString());
                            elemento.Descripcion = reader["Descripcion"].ToString();
                            result.Add(elemento);
                        }
                    }

                }
                return result;
            }
        }
    }
}