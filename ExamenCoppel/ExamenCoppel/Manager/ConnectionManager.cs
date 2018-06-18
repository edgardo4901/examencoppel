using System;
using System.Data.SqlClient;
using System.Configuration;

public static class ConnectionManager
    {
        #region Constructor

        
        #endregion

        private static String _connectionString = String.Empty;

        public static string GetConnectionString()
        {
            if (String.IsNullOrWhiteSpace(_connectionString))
            {
                _connectionString = ConfigurationManager.ConnectionStrings["conStr"].ConnectionString;
            }
            return _connectionString;
        }

        public static SqlConnection ConnectionFactory()
        {
            return new SqlConnection(GetConnectionString());
        }        
       
    }