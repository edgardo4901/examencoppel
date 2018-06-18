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
        GuardarMovimiento();
    });
    body.on('click', '#btnEliminar', null, function (e) {
        EliminarMovimiento();
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
                            if (d.d.Datos.RolEmpleadoID == 3)
                            {
                                $('#cbCubrioTurno').prop('disabled', false);
                            }
                            else
                            {
                                $('#cbCubrioTurno').prop('disabled', true);
                            }
                        }
                        else
                        {
                            examen.showMsg('Alerta', "El Empleado con el Numero:" + $('#txtNumero').val() + " no Existe", 'warning');
                            Limpiar();
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
    var EliminarMovimiento = function () {
        if ($('#txtNumero').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar el Numero de Empleado", 'error');
            return;
        }
        if ($('#txtFecha').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar la Fecha de los Movimientos", 'error');
            return;
        }
        examen.ShowLightBox(true);
        var data = {
            EmpleadoID: $('#txtNumero').val(), Fecha: $('#txtFecha').val()
        };
        var json = JSON.stringify(data)
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Movimiento/EliminarMovimiento",
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
    var GuardarMovimiento = function () {
        var CubrioTurno = 0;
        var CubrioRolEmpleadoID = 0;
        if ($('#cbCubrioTurno').is(':checked')) {
            CubrioTurno = 1
            CubrioRolEmpleadoID = $('#ddlRolCubrio option:selected').val()
        }
        if ($('#txtNumero').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar el Numero de Empleado", 'error');
            return;
        }
        if ($('#txtFecha').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar la Fecha de los Movimientos", 'error');
            return;
        }
        if ($('#txtCantidadEntregas').val().split() == "") {
            examen.showMsg('Alerta', "Favor de Capturar las Entregas de la Fecha", 'error');
            return;
        }
        examen.ShowLightBox(true);
        var data = {
            EmpleadoID: $('#txtNumero').val(), Fecha: $('#txtFecha').val(), CantidadEntregas: $('#txtCantidadEntregas').val()
            ,CubrioTurno:CubrioTurno, CubrioRolEmpleadoID: CubrioRolEmpleadoID
        };
        var json = JSON.stringify(data)
        $.ajax({
            type: "POST",
            url: layautViewModel.subdominioPagina + "/Movimiento/GuardarMovimiento",
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
        $('#ddlRol').find('option').remove();
        $('#ddlRolCubrio').find('option').remove();
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
                        if (d.d.Datos[i].RolEmpleadoID != 3)
                        {
                            $('#ddlRolCubrio').append('<option value=' + d.d.Datos[i].RolEmpleadoID + '>' + d.d.Datos[i].Descripcion + '</option>');
                        }
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
        $('#txtFecha').val('')
        $('#txtCantidadEntregas').val('')
        $('#ddlRol option[value=1]').prop('selected', 'selected');
        $('#ddlTipo option[value=1]').prop('selected', 'selected');
        $('#ddlRolCubrio option[value=1]').prop('selected', 'selected');
        $("#cbCubrioTurno").prop("checked", false);
        $('#ddlTipo').prop('disabled', true);
        $('#ddlRol').prop('disabled', true);
        $('#cbCubrioTurno').prop('disabled', true);
        $('#ddlRolCubrio').prop('disabled', true);
    }

    $(document).ready(function () {

        jQuery('#txtFecha').datetimepicker({
            language: "es",
            autoclose: true,
            format: 'd/m/Y',
            timepicker: false
        });

        $('#ddlTipo').prop('disabled', true);
        $('#ddlRol').prop('disabled', true);
        $('#cbCubrioTurno').prop('disabled', true);
        $('#ddlRolCubrio').prop('disabled', true);
        llenarTiposEmpleado();
        llenarRolesEmpleado();

        $('#cbCubrioTurno').change(function () {
            if ($('#cbCubrioTurno').is(':checked')) {
                $('#ddlRolCubrio').prop('disabled', false);
            }
            else {
                $('#ddlRolCubrio').prop('disabled', true);
            }
        });
    });
}(jQuery, window.examen, window.layautViewModel));
