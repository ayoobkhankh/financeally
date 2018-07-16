$(document).ready(function () {

    const ipc = require('electron').ipcRenderer

    var FromWindow;
   
    ipc.on('SendFrom', (event, arg) => {
        FromWindow = arg;
        // alert(arg);
        $(document).attr("title", "Search Sales : Request from " + arg);
    })

    $("#SelectField").select2({
        placeholder: "Field",
        allowClear: true
    });

    $('#datatable').dataTable({
        pageLength: 5
    });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    var startdate, enddate;

    $('#reservation').daterangepicker({
        startDate: moment().startOf('month'),
        endDate: moment(),
        locale: {
            format: "DD/MM/YYYY",
        },
        singleDatePicker: false,
        showDropdowns: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
                'month')]
        },
        opens: 'right',
        buttonClasses: ['btn btn-info'],
        applyClass: 'btn-sm btn-success',
        cancelClass: 'btn-sm btn-danger',
        separator: ' to ',
        calender_style: "picker_1"
    }, function (start, end, label) {
        startdate = (start.format('YYYY-MM-DD'));
        enddate = (end.format('YYYY-MM-DD'));
    });
    // window.Parsley.on('field:error', function (fieldInstance) {
    //     fieldInstance.$element.popover({
    //         trigger: 'manual',
    //         container: 'body',
    //         placement: 'auto',
    //         html: true,
    //         title: 'Error! <a href="#" class="close" data-dismiss="alert"><i class="fa fa-times-circle" aria-hidden="true"></i></a>   ',
    //         content: function () {
    //             return fieldInstance.getErrorsMessages().join(';');
    //         }
    //     }).popover('show');

    // });

    // window.Parsley.on('field:success', function (fieldInstance) {
    //     fieldInstance.$element.popover('destroy');
    // });

    // $(document).on("click", ".popover .close", function () {
    //     $(this).parents(".popover").popover('hide');
    // });

        // function ClearAll() {
    //     $("#ProductName").val("");
    //     $("#ProductDesc").val("");
    //     $("#ProductType").val("").trigger("change");
    //     $("#ProductCode").val("");
    //     $("#TaxClass").val(0).trigger("change");
    //     $("#IGSTRate").val("");
    //     $("#CGSTRate").val("");
    //     $("#SGSTRate").val("");
    //     $("#CESSRate").val("");
    //     $("#MeasureUnit").val("").trigger("change");
    //     $("#SalePrice").val("");
    // };


    $("#SearchSales").click(function () {
        var list = "";
        // var InvDateFrom = $('#InvDateFrom').val();
        // var InvDateTo = $('#InvDateTo').val();
        // var momentObj1 = moment(InvDateFrom, 'DD/MM/YYYY');
        // var momentObj2 = moment(InvDateTo, 'DD/MM/YYYY');
        // var datediff = momentObj2.diff(momentObj1, 'days');

        // var NewInvDateFrom = moment(momentObj1).format('YYYY-MM-DD')
        // var NewInvDateTo = moment(momentObj2).format('YYYY-MM-DD')
        SearchSales(startdate, enddate, 0, 0).then(rows => {
            console.log(rows);
            var table = $('#datatable').dataTable();
            table.fnClearTable();
            table.fnDestroy();
            // $('#datatable').empty();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                list += "<tr id=''><th scope='row'>" + (i + 1) + "</th><td>" + row.InvoiceNo + " </th><td>" + row.InvDate + "</td><td>" + row.VendorName + "</td><td class='amttd'>" + row.GrossTotal + "</td><td class='amttd'>" + row.TaxTotal + "</td><td class='amttd'>" + row.Total + "</td><td class='amttd'><a href='#' class='selrow' id='" + row.id + "' >Select</a></td></tr>";
            }
            $('#ListTblBody').html(list);
            var table = $('#datatable').dataTable({
                pageLength: 5
            });

            // $('#datatable').data.reload();
            // table = $('#datatable').DataTable({
            // });

            // table.destroy();

            // table = $('#datatable').DataTable({
            //     pageLength: 5
            // });
        });
    });

    $(document).on('click', '.selrow', function () {
        var SalesId = parseInt($(this).attr('id'));
        var arr = [];
        var obj = {
            window: FromWindow,
            SalesId: SalesId
        }
        arr.push(obj);
        ipc.send('GetSalesId', arr);
    });

    // $(body).click(function (fieldInstance) {
    //     fieldInstance.$element.popover('destroy');
    // });

    });
