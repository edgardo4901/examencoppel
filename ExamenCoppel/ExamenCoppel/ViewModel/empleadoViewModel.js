(function ($, examen, layautViewModel) {
    'use strict';
    var body = $('body');

    body.on('keypress', '#txtNumero', null, function (e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            ConsularEmpleado();
        }
    });

    body.on('click', '#btnGuardar', null, function (e) {
        GuardarEmpleado();
    });
    body.on('click', '#btnEliminar', null, function (e) {
        EliminarEmpleado();
    });

    var ConsularEmpleado = function () {
        if ($('#txtNumero').val().split() != "") {
            examen.ShowLightBox(true);
            $.ajax({
                type: "POST",
                url: layautViewModel.subdominioPagina + "/Empleado/ConsultarEmpleado?EmpleadoID=" + $('#txtNumero').val(),
                async: true,
                data: null,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    if (d.d.EsValido) {
                        if (d.d.Datos.EmpleadoID != 0)
                        {
                            $('#txtNombre').val(d.d.Datos.Nombre)
                            $('#ddlRol option[value=' + d.d.Datos.RolEmpleadoID + ']').prop('selected', 'selected');
                            $('#ddlTipo option[value=' + d.d.Datos.TipoEmpleadoID + ']').prop('selected', 'selected');
                        }
                        else
                        {
                            examen.showMsg('Alerta', "El Empleado con el Numero:" + $('#txtNumero').val() + " no Existe", 'warning');
                            $('#txtNombre').val('')
                            $('#ddlRol option[value=1]').prop('selected', 'selected');
                            $('#ddlTipo option[value=1]').prop('selected', 'selected');
                        }
                    }
                    else {
                        examen.showMsg('Alerta', d.d.Mensaje, 'error');
                    }
                    examen.ShowLightBox(false);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    examen.ShowLightBox(false);
                    examen.showMsg('Alerta', errorThrown, 'error');
                }
            });
        }
        
    };
    var EliminarEmpleado = function () {
        if ($('#txtNumero').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar el Numero de Empleado", 'error');
            return;
        }
        examen.ShowLightBox(true);
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Empleado/EliminarEmpleado?EmpleadoID=" + $('#txtNumero').val(),
            async: true,
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                if (d.d.EsValido) {
                    examen.showMsg('Alerta', d.d.Mensaje, 'success');
                    Limpiar();
                }
                else {
                    examen.showMsg('Alerta', d.d.Mensaje, 'error');
                }
                examen.ShowLightBox(false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                examen.ShowLightBox(false);
                examen.showMsg('Alerta', errorThrown, 'error');
            }
        });
    };
    var llenarTiposEmpleado = function () {
        $('#ddlTipo').find('option').remove();
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Catalogo/ConsultarTiposEmpleado",
            async: true,
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                if (d.d.EsValido) {
                    for (var i = 0; i < d.d.Datos.length; i++) {
                        $('#ddlTipo').append('<option value=' + d.d.Datos[i].TipoEmpleadoID + '>' + d.d.Datos[i].Descripcion + '</option>');
                    }
                }
                else {
                    //examen.ShowLightBox(false);
                    examen.showMsg('Alerta', d.d.Mensaje, 'warning');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                examen.showMsg('Alerta', errorThrown, 'error');
            }
        });
    };
    var llenarRolesEmpleado = function () {
        $('#ddlTipo').find('option').remove();
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Catalogo/ConsultarRolesEmpleado",
            async: true,
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                if (d.d.EsValido) {
                    for (var i = 0; i < d.d.Datos.length; i++) {
                        $('#ddlRol').append('<option value=' + d.d.Datos[i].RolEmpleadoID + '>' + d.d.Datos[i].Descripcion + '</option>');
                    }
                }
                else {
                    //examen.ShowLightBox(false);
                    examen.showMsg('Alerta', d.d.Mensaje, 'warning');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                examen.showMsg('Alerta', errorThrown, 'error');
            }
        });
    };
    var Limpiar = function () {
        $('#txtNombre').val('')
        $('#txtNumero').val('')
        $('#ddlRol option[value=1]').prop('selected', 'selected');
        $('#ddlTipo option[value=1]').prop('selected', 'selected');
    }
    var GuardarEmpleado = function () {
        if ($('#txtNombre').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar el Nombre", 'error');
            return;
        }
        examen.ShowLightBox(true);
        var data = {
            EmpleadoID: $('#txtNumero').val(), Nombre: $('#txtNombre').val(), RolEmpleadoID: $('#ddlRol option:selected').val()
            , TipoEmpleadoID: $('#ddlTipo option:selected').val()
        };
        var json = JSON.stringify(data)
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Empleado/GuardarEmpleado",
            async: true,
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                if (d.d.EsValido) {
                    examen.showMsg('Alerta', d.d.Mensaje, 'success');
                    Limpiar();
                }
                else {
                    examen.showMsg('Alerta', d.d.Mensaje, 'error');
                }
                examen.ShowLightBox(false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                examen.ShowLightBox(false);
                examen.showMsg('Alerta', errorThrown, 'error');
            }
        });
    };

    $(document).ready(function () {
        llenarTiposEmpleado();
        llenarRolesEmpleado();
    });
}(jQuery, window.examen, window.layautViewModel));
