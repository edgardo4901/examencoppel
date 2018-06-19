(function () {
    var nav = navigator.userAgent;

    if (nav.indexOf("MSIE") != -1) {
        alert("Estas visitandome desde IE");
    } else if (nav.indexOf("Firefox") != -1) {
        //alert("Estas visitandome desde Firefox");
        Notification.requestPermission()
    } else if (nav.indexOf("Chrome") != -1) {
        //alert("Estas visitandome desde Chrome");
        Notification.requestPermission()
    } else if (nav.indexOf("Opera") != -1) {
        //alert("Estas visitandome desde Opera");
        Notification.requestPermission()
    } else {
        //alert("Desconosco el navegador del que me visitas");
    }
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
})();

window.onload = function () {
    layautViewModel.CargarMenuPrincipal();
};

var layautViewModel = {

    self: this,
    subdominioPagina: '',
    lanzarNotificacion: function (title, message, tipo) {
        var nav = navigator.userAgent;
        if (nav.indexOf("MSIE") != -1) {
            layautViewModel.notificacionIE(title, message, tipo)
        } else if (nav.indexOf("Firefox") != -1) {
            layautViewModel.notificacion(title, message, tipo)
        } else if (nav.indexOf("Chrome") != -1) {
            layautViewModel.notificacion(title, message, tipo)
        } else if (nav.indexOf("Opera") != -1) {
            layautViewModel.notificacion(title, message, tipo)
        } else {
            layautViewModel.notificacionIE(title, message, tipo)
        }
    },
    notificacion: function (title, message, tipo) {
        if (tipo == 1) {
            Command: toastr["error"](message, title)
        }
        else if(tipo == 2)
        {
            Command: toastr["success"](message, title)
        }
        else if (tipo == 3) {
                Command: toastr["warning"](message, title)
        }
    },
    notificacionIE: function (title, message, tipo) {
        if (tipo == 1) {
            Command: toastr["error"](message, title)
        }
        else if (tipo == 2) {
                Command: toastr["success"](message, title)
        }
        else if (tipo == 3) {
                Command: toastr["warning"](message, title)
        }
    },
    validarNumero: function (event) {
        if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
        }
        return false;
    },
    CargarMenuPrincipal: function () {
        $("#navbarNav1").empty();
        //llena el menu
        var menu = "<ul class='navbar-nav mr-auto'>";

        menu = menu + "<li class='nav-item menuPrincipal' value='/Movimiento/Index'><a class='nav-link waves-effect waves-light' style='display: inline-block;padding-left: 0;'>Movimientos</a></li>";
        menu = menu + "<li class='nav-item menuPrincipal' value='/Empleado/Index'><a class='nav-link waves-effect waves-light' style='display: inline-block;padding-left: 0;' >Empleado</a></li>";
        menu = menu + "<li class='nav-item menuPrincipal' value='/Empleado/Nomina'><a class='nav-link waves-effect waves-light' style='display: inline-block;padding-left: 0;' >Nomina</a></li>";
        menu = menu + "</ul>";
        $("#navbarNav1").append(menu);
        $(".menuPrincipal").click(function () {
            var value = $(this).attr("value");
            location.href = layautViewModel.subdominioPagina + value;
        });
    },
    round: function (value, decimals) {
        var a = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
};

//Funciones de uso general en todas las pantallas
(function ($, window, toastr) {
    'use strict';

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var showMsg = function (titulo, mensaje, tipoMensaje) {
        toastr[tipoMensaje](mensaje, titulo);
    }

    var ejecutaAjax = function (url, tipo, datos, successfunc, errorfunc, async) {
        $.ajax(url, {
            type: tipo || 'POST',
            cache: false,
            async: async,
            dataType: 'json',
            data: datos ? JSON.stringify(datos) : '{}',
            contentType: 'application/json; charset=utf-8',
            success: successfunc,
            error: errorfunc || function (d) {
                console.log(d.responseText);
            }
        });
    };
    var ShowLightBox = function (Mostrar) {
        if (Mostrar == true) {
            $("body").addClass("loading");
        } else {
            $("body").removeClass("loading");
        }
    };

    var focusNextControl = function (control, e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            var inputs = $("#ContenedorPrincipal").find('input[type=text]:enabled, input[type=password]:enabled, input[type=button]:enabled, input[type=checkbox]:enabled, input[type=radio]:enabled, input[type=date]:enabled, input[type=tel]:enabled, input[type=email]:enabled, input[type=number]:enabled, select:enabled, textarea:enabled').not('input[readonly=readonly], fieldset:hidden *, *:hidden');
            inputs.eq(inputs.index(control) + 1).focus();
            e.preventDefault();
        }
    };
    window.examen = (function () {
        return {
            showMsg: showMsg,
            ejecutaAjax: ejecutaAjax,
            ShowLightBox: ShowLightBox,
            focusNextControl: focusNextControl
        };
    }());

}(jQuery, window, toastr));