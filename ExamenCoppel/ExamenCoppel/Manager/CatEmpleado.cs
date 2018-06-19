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
        public static List<Models.CatEmpleado> ConsultarEmpleados(int EmpleadoID)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.CatEmpleado>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[CatEmpleadoSelectDiferente]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(EmpleadoID, DbType.Int32, "@EmpleadoID");
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Models.CatEmpleado elemento = new Models.CatEmpleado();
                            elemento.EmpleadoID = int.Parse(reader["EmpleadoID"].ToString());
                            elemento.Nombre = reader["Nombre"].ToString();
                            elemento.RolEmpleadoID = int.Parse(reader["RolEmpleadoID"].ToString());
                            elemento.TipoEmpleadoID = int.Parse(reader["TipoEmpleadoID"].ToString());
                            result.Add(elemento);
                        }

                    }
                    return result;

                }
            }
        }
        public static List<Models.EmpleadoNomina> ConsultarNominaEmpleado(int mes,int ano)
        {
            using (var connection = ConnectionManager.ConnectionFactory())
            {
                var result = new List<Models.EmpleadoNomina>();
                using (var command = connection.CreateCommand())
                {

                    command.CommandText = "[EmpleadoNominaSelect]";
                    command.CommandType = CommandType.StoredProcedure;

                    command.AddParameter(mes, DbType.Int32, "@Mes");
                    command.AddParameter(ano, DbType.Int32, "@Ano");
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Models.EmpleadoNomina elemento = new Models.EmpleadoNomina();
                            elemento.EmpleadoID = int.Parse(reader["EmpleadoID"].ToString());
                            elemento.Nombre = reader["Nombre"].ToString();
                            elemento.RolEmpleado = reader["RolEmpleado"].ToString();
                            elemento.TipoEmpleado = reader["TipoEmpleado"].ToString();
                            elemento.CantidadEntregas = int.Parse(reader["CantidadEntregas"].ToString());
                            elemento.SueldoMensual = decimal.Parse(reader["SueldoMensual"].ToString());
                            elemento.BonoHorasMensual = decimal.Parse(reader["BonoHorasMensual"].ToString());
                            elemento.BonoEntregas = decimal.Parse(reader["BonoEntregas"].ToString());
                            elemento.BonoHorasCubrir = decimal.Parse(reader["BonoHorasCubrir"].ToString());
                            elemento.DescuentoHorasFaltas = decimal.Parse(reader["DescuentoHorasFaltas"].ToString());
                            elemento.BonoValeDespensa = decimal.Parse(reader["BonoValeDespensa"].ToString());
                            elemento.RetencionISR = decimal.Parse(reader["RetencionISR"].ToString());
                            elemento.SueldoBrutoMensual = decimal.Parse(reader["SueldoBrutoMensual"].ToString());
                            elemento.SueldoNetoMensual = elemento.SueldoBrutoMensual - elemento.RetencionISR;
                            result.Add(elemento);
                        }

                    }
                    return result;

                }
            }
        }
    }
}