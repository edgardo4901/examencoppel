USE [DB_A2A26A_coppel]
GO
/****** Object:  Table [dbo].[CatEmpleado]    Script Date: 20/06/2018 06:50:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatEmpleado](
	[EmpleadoID] [int] NOT NULL,
	[Nombre] [varchar](250) NOT NULL,
	[RolEmpleadoID] [int] NOT NULL,
	[TipoEmpleadoID] [int] NOT NULL,
	[Estatus] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatMovimiento]    Script Date: 20/06/2018 06:50:16 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatMovimiento](
	[MovimientoID] [int] NOT NULL,
	[EmpleadoID] [int] NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[CantidadEntregas] [int] NOT NULL,
	[CubrioTurno] [int] NOT NULL,
	[CubrioRolEmpleadoID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatRolEmpleado]    Script Date: 20/06/2018 06:50:16 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatRolEmpleado](
	[RolEmpleadoID] [int] NOT NULL,
	[Descripcion] [varchar](150) NOT NULL,
	[BonoHora] [decimal](18, 3) NULL,
	[HorasDiarias] [int] NULL,
	[SueldoHora] [decimal](18, 3) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatTipoEmpleado]    Script Date: 20/06/2018 06:50:16 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatTipoEmpleado](
	[TipoEmpleadoID] [int] NOT NULL,
	[Descripcion] [varchar](250) NOT NULL,
	[PorcentajeBonoDespensa] [decimal](18, 3) NULL
) ON [PRIMARY]
GO
