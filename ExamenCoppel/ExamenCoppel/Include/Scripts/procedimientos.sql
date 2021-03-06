USE [DB_A2A26A_coppel]
GO
/****** Object:  StoredProcedure [dbo].[CatEmpleadoDelete]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[CatEmpleadoDelete] 
@EmpleadoID int,
@Respuesta varchar(250) output          
AS     
if exists (select '' from dbo.CatEmpleado (Nolock) where EmpleadoID=@EmpleadoID) begin
	delete from CatEmpleado where EmpleadoID=@EmpleadoID

	set @Respuesta = 'Empleado Eliminado Correctamente'

end 
else begin
	set @Respuesta = 'El Numero de Empleado no Existe'
end
GO
/****** Object:  StoredProcedure [dbo].[CatEmpleadoSave]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CatEmpleadoSave] 
@EmpleadoID int,
@Nombre varchar(250),
@RolEmpleadoID int,
@TipoEmpleadoID int,
@Respuesta varchar(250) output          
AS     
if exists (select '' from dbo.CatEmpleado (Nolock) where EmpleadoID=@EmpleadoID) begin
	update CatEmpleado set 
		Nombre = @Nombre,
		RolEmpleadoID = @RolEmpleadoID,
		TipoEmpleadoID = @TipoEmpleadoID
	where EmpleadoID=@EmpleadoID

	set @Respuesta = 'Empleado Actualizado Correctamente'

end 
else begin
	if(@EmpleadoID = 0)
	begin
	set @EmpleadoID=(SELECT ISNULL(MAX(EmpleadoID),0)+ 1 FROM CatEmpleado (NOLOCK))
	end
	insert into CatEmpleado(EmpleadoID,Nombre,RolEmpleadoID,TipoEmpleadoID,Estatus)
	values(@EmpleadoID,@Nombre,@RolEmpleadoID,@TipoEmpleadoID,1)

	set @Respuesta = 'Empleado Guardado Correctamente Con el Numero:' + CAST(@EmpleadoID as varchar(10))
end
GO
/****** Object:  StoredProcedure [dbo].[CatEmpleadoSelect]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[CatEmpleadoSelect] 
@EmpleadoID int     
AS     
select EmpleadoID
,Nombre
,RolEmpleadoID
,TipoEmpleadoID
,Estatus from CatEmpleado where EmpleadoID=@EmpleadoID
GO
/****** Object:  StoredProcedure [dbo].[CatEmpleadoSelectDiferente]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CatEmpleadoSelectDiferente] 
@EmpleadoID int     
AS     
select EmpleadoID
,Nombre
,RolEmpleadoID
,TipoEmpleadoID
,Estatus from CatEmpleado 
where EmpleadoID <> @EmpleadoID
and RolEmpleadoID <> 3
GO
/****** Object:  StoredProcedure [dbo].[CatMovimientoDelete]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[CatMovimientoDelete] 
@EmpleadoID int,
@Fecha datetime,
@Respuesta varchar(250) output          
AS     
if exists (select '' from dbo.CatMovimiento (Nolock) where EmpleadoID=@EmpleadoID and Fecha = @Fecha) begin
	
	delete from CatMovimiento where EmpleadoID=@EmpleadoID and Fecha = @Fecha

	set @Respuesta = 'Movimientos de Empleado Eliminados Correctamente'

end 
else begin
	set @Respuesta = 'No Existen Movimientos de el Empleado Para la Fecha Seleccionada'
end
GO
/****** Object:  StoredProcedure [dbo].[CatMovimientoSave]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CatMovimientoSave] 
@MovimientoID int,
@EmpleadoID int,
@Fecha datetime,
@CantidadEntregas int,
@CubrioTurno int,
@CubrioRolEmpleadoID int,
@Respuesta varchar(250) output          
AS  
if not exists (select '' from dbo.CatEmpleado (Nolock) where EmpleadoID=@EmpleadoID) begin

	set @Respuesta = 'El Empleado que Ingreso no Existe'

end    
else if exists (select '' from dbo.CatMovimiento (Nolock) where EmpleadoID=@EmpleadoID and Fecha = @Fecha) begin
	update CatMovimiento set 
		CantidadEntregas = @CantidadEntregas,
		CubrioTurno = @CubrioTurno,
		CubrioRolEmpleadoID = @CubrioRolEmpleadoID
	where EmpleadoID=@EmpleadoID and Fecha = @Fecha

	set @Respuesta = 'Movimientos Empleado Actualizado Correctamente'

end 
else begin
	set @MovimientoID=(SELECT ISNULL(MAX(MovimientoID),0)+ 1 FROM CatMovimiento (NOLOCK))
	insert into CatMovimiento(MovimientoID,EmpleadoID,Fecha,CantidadEntregas,CubrioTurno,CubrioRolEmpleadoID)
	values(@MovimientoID,@EmpleadoID,@Fecha,@CantidadEntregas,@CubrioTurno,@CubrioRolEmpleadoID)

	set @Respuesta = 'Movimientos de Empleado Guardado Correctamente'
end
GO
/****** Object:  StoredProcedure [dbo].[CatMovimientoSelect]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[CatMovimientoSelect] 
@EmpleadoID int,
@Fecha datetime      
AS     
select MovimientoID
,EmpleadoID
,Fecha
,CantidadEntregas
,CubrioTurno
,CubrioRolEmpleadoID from CatMovimiento
where EmpleadoID=@EmpleadoID and Fecha = @Fecha
GO
/****** Object:  StoredProcedure [dbo].[CatRolEmpleadoSelect]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CatRolEmpleadoSelect]             
AS     
select RolEmpleadoID,Descripcion from CatRolEmpleado
GO
/****** Object:  StoredProcedure [dbo].[CatTipoEmpleadoSelect]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CatTipoEmpleadoSelect]  
--@Estatus int = null             
AS     
select TipoEmpleadoID,Descripcion from CatTipoEmpleado
GO
/****** Object:  StoredProcedure [dbo].[EmpleadoNominaSelect]    Script Date: 20/06/2018 06:51:35 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[EmpleadoNominaSelect] 
@Mes int,
@Ano int    
AS     
if object_id('tempdb..#Nomina') is not null    
drop table #Nomina
CREATE TABLE #Nomina(renglon int identity(1,1),EmpleadoID int,Nombre varchar(250),RolEmpleado varchar(250),TipoEmpleado varchar(250),CantidadEntregas int,SueldoMensual decimal(18,3)
,BonoHorasMensual decimal(18,3),BonoEntregas decimal(18,3),BonoValeDespensa decimal(18,3),BonoHorasCubrir decimal(18,3),DescuentoHorasFaltas decimal(18,3))
insert into #Nomina(EmpleadoID,Nombre,RolEmpleado,TipoEmpleado,CantidadEntregas,SueldoMensual,BonoHorasMensual,BonoEntregas,BonoValeDespensa,BonoHorasCubrir,DescuentoHorasFaltas)
select ce.EmpleadoID
,ce.Nombre
,cre.Descripcion as RolEmpleado
,cte.Descripcion as TipoEmpleado
,isnull(sum(cm.CantidadEntregas),0) as CantidadEntregas
,cre.SueldoHora*cre.HorasDiarias*30 as SueldoMensual
,cre.BonoHora * cre.HorasDiarias * 30 as BonoHorasMensual
,isnull(sum(cm.CantidadEntregas),0) * 5 as BonoEntregas
,cte.PorcentajeBonoDespensa
,dbo.fnBonoCubrir(ce.EmpleadoID,@Mes,@Ano)
,dbo.fnDescuentos(ce.EmpleadoID,@Mes,@Ano)
 from CatEmpleado ce
left join CatMovimiento cm on ce.EmpleadoID = cm.EmpleadoID and Year(cm.Fecha) = @Ano and Month(cm.Fecha) = @Mes
join CatTipoEmpleado cte on ce.TipoEmpleadoID = cte.TipoEmpleadoID
join CatRolEmpleado cre on ce.RolEmpleadoID = cre.RolEmpleadoID
group by ce.EmpleadoID,ce.Nombre,cre.Descripcion,cte.Descripcion,cre.BonoHora,cte.PorcentajeBonoDespensa,cre.HorasDiarias,cre.SueldoHora

select EmpleadoID,Nombre,RolEmpleado,TipoEmpleado,CantidadEntregas,SueldoMensual,BonoHorasMensual,BonoEntregas
,BonoHorasCubrir,DescuentoHorasFaltas
,(SueldoMensual + BonoHorasMensual + BonoEntregas + BonoHorasCubrir - DescuentoHorasFaltas) * BonoValeDespensa as BonoValeDespensa 
,Case when SueldoMensual + BonoHorasMensual + BonoEntregas + BonoHorasCubrir - DescuentoHorasFaltas > 16000 then 
(SueldoMensual + BonoHorasMensual + BonoEntregas + BonoHorasCubrir - DescuentoHorasFaltas) * .12
else (SueldoMensual + BonoHorasMensual + BonoEntregas + BonoHorasCubrir - DescuentoHorasFaltas) * .09 end as RetencionISR
,SueldoMensual + BonoHorasMensual + BonoEntregas + BonoHorasCubrir - DescuentoHorasFaltas as SueldoBrutoMensual
 from #Nomina
GO
