$(document).ready(function () {

  var fs = require("fs");
  var path = require('path');

  $("body").css("overflow", "hidden");

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
    opens: 'left',
    buttonClasses: ['btn btn-info'],
    applyClass: 'btn-sm btn-success',
    cancelClass: 'btn-sm btn-danger',
    separator: ' to ',
    calender_style: "picker_1"
  }, function (start, end, label) {
    var nowdate = (start.format('DD/MM/YYYY'));
  });

  // function PingServer() {
  //   con.query("SELECT version() as version, @@hostname hostname", function (err, rows) {
  //     if (err) {
  //       $('#ServerStatus').text("Server offline");
  //     }
  //     var row = rows[0];
  //     $('#ServerStatus').text("Running version: " + row.version);
  //   });
  // }

  // PingServer();

  // setInterval(function () {
  //   PingServer()
  // }, 60000);

  // function MakeChart() {
  //   var data1 = [
  //     [gd(2012, 0, 1), 1652.21],
  //     [gd(2012, 1, 1), 1742.14],
  //     [gd(2012, 2, 1), 1673.77],
  //     [gd(2012, 3, 1), 1649.69],
  //     [gd(2012, 4, 1), 1591.19],
  //     [gd(2012, 5, 1), 1598.76],
  //     [gd(2012, 6, 1), 1589.90],
  //     [gd(2012, 7, 1), 1630.31],
  //     [gd(2012, 8, 1), 1744.81],
  //     [gd(2012, 9, 1), 1746.58],
  //     [gd(2012, 10, 1), 1721.64],
  //     [gd(2012, 11, 2), 1684.76]
  //   ];

  //   var data2 = [
  //     [gd(2012, 0, 1), 0.63],
  //     [gd(2012, 1, 1), 5.44],
  //     [gd(2012, 2, 1), -3.92],
  //     [gd(2012, 3, 1), -1.44],
  //     [gd(2012, 4, 1), -3.55],
  //     [gd(2012, 5, 1), 0.48],
  //     [gd(2012, 6, 1), -0.55],
  //     [gd(2012, 7, 1), 2.54],
  //     [gd(2012, 8, 1), 7.02],
  //     [gd(2012, 9, 1), 0.10],
  //     [gd(2012, 10, 1), -1.43],
  //     [gd(2012, 11, 2), -2.14]
  //   ];
  //   var dataset = [{
  //       label: "Gold Price",
  //       data: data1,
  //       points: {
  //         symbol: "triangle"
  //       }
  //     },
  //     {
  //       label: "Change",
  //       data: data2,
  //       yaxis: 2
  //     }
  //   ];

  //   var options = {
  //     series: {
  //       lines: {
  //         show: true
  //       },
  //       points: {
  //         radius: 3,
  //         fill: true,
  //         show: true
  //       }
  //     },
  //     xaxis: {
  //       mode: "time",
  //       tickSize: [1, "month"],
  //       tickLength: 0,
  //       axisLabel: "2012",
  //       axisLabelUseCanvas: true,
  //       axisLabelFontSizePixels: 12,
  //       axisLabelFontFamily: 'Verdana, Arial',
  //       axisLabelPadding: 10
  //     },
  //     yaxes: [{
  //       axisLabel: "Gold Price(USD)",
  //       axisLabelUseCanvas: true,
  //       axisLabelFontSizePixels: 12,
  //       axisLabelFontFamily: 'Verdana, Arial',
  //       axisLabelPadding: 3,
  //       tickFormatter: function (v, axis) {
  //         return $.formatNumber(v, {
  //           format: "#,###",
  //           locale: "us"
  //         });
  //       }
  //     }, {
  //       position: "right",
  //       axisLabel: "Change(%)",
  //       axisLabelUseCanvas: true,
  //       axisLabelFontSizePixels: 12,
  //       axisLabelFontFamily: 'Verdana, Arial',
  //       axisLabelPadding: 3
  //     }],
  //     legend: {
  //       noColumns: 0,
  //       labelBoxBorderColor: "#000000",
  //       position: "nw"
  //     },
  //     grid: {
  //       hoverable: true,
  //       borderWidth: 2,
  //       borderColor: "#633200",
  //       backgroundColor: {
  //         colors: ["#ffffff", "#EDF5FF"]
  //       }
  //     },
  //     colors: ["#FF0000", "#0022FF"]
  //   };

  //   $.plot($("#canvas_dahs"), dataset, options);


  // }

  // function gd(year, month, day) {
  //   return new Date(year, month, day).getTime();
  // }

  // MakeChart();

  const ipc = require('electron').ipcRenderer


  $("#ShowEditMaster").click(function () {

    ipc.send('ShowEditMaster', 'ping')

  });

  $("#ShowEditBanks").click(function () {

    ipc.send('ShowEditBanks', 'ping')

  });

  $("#ShowEditMasterAddress").click(function () {

    ipc.send('ShowEditMasterAddress', 'ping')

  });

  $("#Printtest").click(function () {

    ipc.send('Printtest', 'ping')

  });


  $("#ShowManageParty").click(function () {

    ipc.send('ShowManageParty', 'ping')

  });

  $("#ShowManageAdress").click(function () {

    ipc.send('ShowManageAdress', 'ping')

  });

  $("#ShowManageTax").click(function () {

    ipc.send('ShowManageTax', 'ping')

  });


  $("#ShowManageProduct").click(function () {

    ipc.send('ShowManageProduct', 'ping')

  });

  $("#ShowPOS").click(function () {

    ipc.send('ShowPOS', 'ping')

  });

  $("#ShowManagePurchases").click(function () {

    ipc.send('ShowManagePurchases', 'ping')

  });

  $("#ShowSearchSales").click(function () {

    ipc.send('ShowSearchSales', 'ping')

  });

  $("#logoff").click(function () {

    if (confirm('Are you sure you want to exit ?')) {
      ipc.send('logoff', 'ping')
    }


  });
});