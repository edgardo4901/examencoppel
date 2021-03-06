USE [DB_A2A26A_coppel]
GO
/****** Object:  UserDefinedFunction [dbo].[fnBonoCubrir]    Script Date: 20/06/2018 06:52:22 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fnBonoCubrir] 
(   
    @EmpleadoID int,
	@Mes int,
	@Ano int
)

RETURNS decimal(18,3)
AS
begin
return (select isnull(sum(cre.HorasDiarias * cre.BonoHora),0)  
from CatMovimiento cm
join CatEmpleado ce on cm.CubrioRolEmpleadoID = ce.EmpleadoID and cm.EmpleadoID = @EmpleadoID and Year(cm.Fecha) = @Ano and Month(cm.Fecha) = @Mes
join CatRolEmpleado cre on ce.RolEmpleadoID = cre.RolEmpleadoID)
end
GO
/****** Object:  UserDefinedFunction [dbo].[fnDescuentos]    Script Date: 20/06/2018 06:52:22 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fnDescuentos] 
(   
     @EmpleadoID int,
	@Mes int,
	@Ano int
)

RETURNS decimal(18,3)
AS
begin
return (select isnull(sum(cre.HorasDiarias * cre.BonoHora),0)  
from CatMovimiento cm
join CatEmpleado ce on cm.CubrioRolEmpleadoID = ce.EmpleadoID and cm.CubrioRolEmpleadoID = @EmpleadoID and Year(cm.Fecha) = @Ano and Month(cm.Fecha) = @Mes
join CatRolEmpleado cre on ce.RolEmpleadoID = cre.RolEmpleadoID)
end
GO
