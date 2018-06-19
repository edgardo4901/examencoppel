(function ($, examen, layautViewModel) {
    'use strict';
    var body = $('body');

    var ConsularEmpleadoNomina = function () {
            examen.ShowLightBox(true);
            $.ajax({
                type: "POST",
                url: layautViewModel.subdominioPagina + "/Empleado/ConsultarEmpleadoNomina?mes=" + $('#ddlMes option:selected').val() + "&ano=" + $('#ddlAno option:selected').val(),
                async: true,
                data: null,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    if (d.d.EsValido) {
                        if (d.d.Datos.length > 0)
                        {
                            $('#divEmpleados').empty();
                            for (var i = 0; i < d.d.Datos.length; i++) {
                                var html = "<tr class='bordeAzul'>"
                                html = html + "<th>" + d.d.Datos[i].Nombre + "</th>"
                                html = html + "<th>" + d.d.Datos[i].RolEmpleado + "</th>"
                                html = html + "<th>" + d.d.Datos[i].TipoEmpleado + "</th>"
                                html = html + "<th>" + d.d.Datos[i].CantidadEntregas + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].SueldoMensual, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].BonoHorasMensual, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].BonoEntregas, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].BonoHorasCubrir, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].DescuentoHorasFaltas, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].BonoValeDespensa, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].RetencionISR, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].SueldoBrutoMensual, 2) + "</th>"
                                html = html + "<th>" + layautViewModel.round(d.d.Datos[i].SueldoNetoMensual, 2) + "</th>"
                                html = html + "</tr>"
                                $("#divEmpleados").append(html);
                            }
                        }
                        else
                        {
                            examen.showMsg('Alerta', "No Existe Informacion", 'warning');
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
        
    };

    $(document).ready(function () {
        $('#ddlMes').append('<option value=01>' + 'Enero' + '</option>');
        $('#ddlMes').append('<option value=02>' + 'Febrero' + '</option>');
        $('#ddlMes').append('<option value=03>' + 'Marzo' + '</option>');
        $('#ddlMes').append('<option value=04>' + 'Abril' + '</option>');
        $('#ddlMes').append('<option value=05>' + 'Mayo' + '</option>');
        $('#ddlMes').append('<option value=06>' + 'Junio' + '</option>');
        $('#ddlMes').append('<option value=07>' + 'Julio' + '</option>');
        $('#ddlMes').append('<option value=08>' + 'Agosto' + '</option>');
        $('#ddlMes').append('<option value=09>' + 'Septiembre' + '</option>');
        $('#ddlMes').append('<option value=10>' + 'Octubre' + '</option>');
        $('#ddlMes').append('<option value=11>' + 'Noviembre' + '</option>');
        $('#ddlMes').append('<option value=12>' + 'Diciembre' + '</option>');
        for (var j = 2018; j <= 2030; j++) {
            $('#ddlAno').append('<option value=' + j + '>' + j + '</option>');
        }
        var fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var año = fecha.getFullYear();
        $('#ddlMes option[value=' + mes + ']').prop('selected', 'selected');
        $('#ddlAno option[value=' + año + ']').prop('selected', 'selected');
        $('#ddlMes').change(function () {
            ConsularEmpleadoNomina();
        });
        $('#ddlAno').change(function () {
            ConsularEmpleadoNomina();
        });
        ConsularEmpleadoNomina();
    });
}(jQuery, window.examen, window.layautViewModel));
