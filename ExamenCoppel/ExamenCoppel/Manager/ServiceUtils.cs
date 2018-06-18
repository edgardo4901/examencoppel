using System;
using System.Data;
public static class ServiceUtils
    {
        public static IDbDataParameter AddParameter(this IDbCommand command, object value, DbType type, string name, bool isUotput = false)
        {
            IDbDataParameter parameter = command.CreateParameter();
            parameter.Value = value ?? DBNull.Value;
            parameter.DbType = type;
            parameter.ParameterName = name;

            if (isUotput)
            {
                parameter.Direction = ParameterDirection.Output;
                if (type.Equals(DbType.String))
                {
                    parameter.Size = 350;
                }
                if (type.Equals(DbType.Xml))
                {
                    parameter.Size = int.MaxValue;
                }
            }

            command.Parameters.Add(parameter);
            return parameter;
        }

        public static int ReaderToInt32 (Object readerObject)
        {
            return readerObject == DBNull.Value ? 0 : Convert.ToInt32(readerObject);
        }

        public static int? ReaderToInt32Nullable(Object readerObject)
        {
            return readerObject == DBNull.Value ? null : new Int32?(Convert.ToInt32(readerObject));
        }

        public static DateTime? ReaderToDateTimeNullable(Object readerObject)
        {
            return readerObject == DBNull.Value ? null : new DateTime? (Convert.ToDateTime(readerObject));
        }


        public static Decimal? ReaderToDecimalNullable(Object readerObject)
        {
            return readerObject == DBNull.Value ? null : new decimal?(Convert.ToDecimal(readerObject));
        }

        public static Boolean ReaderToBoolean(Object readerObject)
        {
            return readerObject == DBNull.Value ? false : Convert.ToBoolean(readerObject);
        }
    
    }