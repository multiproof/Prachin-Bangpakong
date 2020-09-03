function GetDataWaterStationTatol(fromdate, todate) {

    $.ajax({
        type: "POST",
        url: "/Home/StationDatawaterTotal",
        data: { 'fromdate': fromdate, 'todate': todate },
        dataType: "json",
        success: function (data) {

            // console.log(data);

            var statusdata = true;
            var i;
            var html = '';
            $('.data-table tbody').empty();
            for (i = 0; i < data.length; i++) {
                html += '\r\n'
                if (i % 2) {
                    html += '<tr style="background-color:#E9EBF5;">'
                }
                else {
                    html += '<tr style="background-color:#CFD5EA;">'
                }
                var resdateReceive = data[i].On_Datetime.split(" ");
                var resdateCurrent = data[i].On_Date;


                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                today = dd + '/' + mm + '/' + yyyy;


                if (resdateReceive[0] == today) {
                    statusdata = true;
                }
                var stringnum = Number(i) + 1;
                html += '<td>' + stringnum + '</td> '

                html += '<td  class="sticky-table-colum" style="text-align: left;"><a href="/home/station?code=' + data[i].Codestation + ' ">' + data[i].stationName + '<br/></td>'


                if (statusdata = true) {

                    if (data[i].StatusShow == "True") {
                        html += '<td colspan="11" style="background-color:#ddd">อยู่ระหว่างปรับปรุง</td> '
                    } else {



                        html += '<td>' + data[i].On_Date + '</td> '
                        html += '<td>' + data[i].On_time.substring(0, 5); + '</td> '
                        html += '<td>' + data[i].Entrance + '</td> '

                        //ความเค็ม
                        if (data[i].StatusSalinityChage == 'Down') {
                            html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Salinity + '</p></td> '
                        }
                        else if (data[i].StatusSalinityChage == 'Up') {
                            html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Salinity + '</p></td> '
                        }
                        else {
                            html += '<td><p style="float:right;padding-right: 5px;">' + data[i].Salinity + '</p></td> '
                        }


                        //ค่าการนำไฟฟ้า
                        if (data[i].StatusConductivityChage == 'Down') {
                            html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].DataConductivity + '</p></td> '
                        }
                        else if (data[i].StatusConductivityChage == 'Up') {
                            html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].DataConductivity + '</p></td> '
                        }
                        else {
                            html += '<td><p style="float:right;padding-right: 5px;">' + data[i].DataConductivity + '</p></td> '
                        }


                        //ออกซิเจน
                        if (data[i].StatusDoChage == 'Down') {

                            if (data[i].DataDo < 2) {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;"> 2.00 </p></td> '
                            } else {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].DataDo + '</p></td> '
                            }

                        }
                        else if (data[i].StatusDoChage == 'Up') {
                            if (data[i].DataDo < 2) {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;"> 2.00 </p></td> '
                            } else {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].DataDo + '</p></td> '
                            }

                        }
                        else {
                            if (data[i].DataDo < 2) {
                                html += '<td><p style="float:right;padding-right: 5px;"> 2.00 </p></td> '
                            } else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].DataDo + '</p></td> '
                            }

                        }




                        if (data[i].StatuspHChage == 'Down') {
                            if (data[i].pH > 8.5) {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;"> 8.50 </p></td> '
                            }
                            else if (data[i].pH < 6.5) {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;"> 6.50 </p></td> '
                            } else {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].pH + '</p> </td> '
                            }
                        }
                        else if (data[i].StatuspHChage == 'Up') {
                            if (data[i].pH > 8.5) {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;"> 8.50 </p></td> '
                            }
                            else if (data[i].pH < 6.5) {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;"> 6.50 </p></td> '
                            } else {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].pH + '</p> </td> '
                            }
                        }
                        else {
                            if (data[i].pH > 8.5) {
                                html += '<td><p style="float:right;padding-right: 5px;"> 8.50 </td> '
                            } else if (data[i].pH < 6.5) {
                                html += '<td><p style="float:right;padding-right: 5px;"> 6.50 </td> '
                            } else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].pH + '</p></td> '
                            }
                        }

                        //สารละลาย
                        if (data[i].StatusSolutionChage == 'Down') {
                            html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].TDS + '</p></td> '
                        }
                        else if (data[i].StatusSolutionChage == 'Up') {
                            html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].TDS + '</p></td> '
                        }
                        else {
                            html += '<td><p style="float:right;padding-right: 5px;">' + data[i].TDS + '</p></td> '
                        }

                        //อุณหภูมิ
                        if (data[i].StatusTempChage == 'Down') {
                            if (data[i].Temp > 40) {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">40</p></td> '
                            } else {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Temp + '</p></td> '
                            }

                        }
                        else if (data[i].StatusTempChage == 'Up') {
                            if (data[i].Temp > 40) {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">40</p></td> '
                            } else {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Temp + '</p></td> '
                            }
                        }
                        else {
                            if (data[i].Temp > 40) {
                                html += '<td><p style="float:right;padding-right: 5px;">40</p></td> '
                            } else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].Temp + '</p></td> '
                            }
                        }



                        if (data[i].Flow == '0.00' && data[i].velocity == '0.00') {
                            html += '<td><p style="float:right;padding-right: 5px;">N/A</p></td> '
                            html += '<td><p style="float:right;padding-right: 5px;">N/A</p></td> '
                            html += '<td><p style="float:right;padding-right: 5px;">N/A</p></td> '

                        } else {
                            if (data[i].StatusLevelWaterChage == 'Down') {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Level_water + '</p></td> '
                            }
                            else if (data[i].StatusLevelWaterChage == 'Up') {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Level_water + '</p></td> '
                            }
                            else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].Level_water + '</p></td> '
                            }

                            if (data[i].StatusFlowChage == 'Down') {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Flow + '</p></td> '
                            }
                            else if (data[i].StatusFlowChage == 'Up') {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].Flow + '</p></td> '
                            }
                            else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].Flow + '</p></td> '
                            }

                            if (data[i].StatusVelocityChage == 'Down') {
                                html += '<td><i class="glyphicon glyphicon-arrow-up" style="color:dodgerblue;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].velocity + '</p></td> '
                            }
                            else if (data[i].StatusVelocityChage == 'Up') {
                                html += '<td><i  class="glyphicon glyphicon-arrow-down" style="color:grey;float: left;"></i><p style="float:right;padding-right: 5px;">' + data[i].velocity + '</p></td> '
                            }
                            else {
                                html += '<td><p style="float:right;padding-right: 5px;">' + data[i].velocity + '</p></td> '
                            }

                        }
                    }

                }

                html += '\r\n </tr>';

            }

            $('.data-table tbody').append(html);


        },
        error: function (result) {
            //alert('eerr' + result);

        }
    });

}

function GetDataWaterStation(codestation, displaytype, fromdate, todate, showtype, page) {
    if (displaytype != 'total') {
        var stationname = $("#selectstation option:selected").text();
        var res = stationname.split(" ");

        $("#P_StationName").html(res[0]);
        document.getElementById("imgstation1").src = "../img/Station/" + codestation + "/" + codestation + ".jpg";
        document.getElementById("imgstation2").src = "../img/Station/" + codestation + "/" + codestation + "b.jpg";
        document.getElementById("imgstation3").src = "../img/Station/" + codestation + "/" + codestation + "c.jpg";
        document.getElementById("ratingcove").src = "../UploadedFiles/ratingcove/" + codestation + "/RT" + codestation + ".jpg";
    }

    $.ajax({
        type: "POST",
        url: "/Home/StationDatawater",
        data: { 'station': codestation, 'displaylist': displaytype, 'fromdate': fromdate, 'todate': todate, 'showtype': showtype },
        dataType: "json",
        success: function (data) {


            //console.log(data);

            var statusdata = true;
            var i;
            var html = '';
            $('.data-table tbody').empty();
            for (i = 0; i < data.length; i++) {
                html += '\r\n'
                if (i % 2) {
                    html += '<tr style="background-color:#E9EBF5;">'
                }
                else {
                    html += '<tr style="background-color:#CFD5EA;">'
                }

                var resdateReceive = data[i].On_Datetime.split(" ");
                var resdateCurrent = data[i].On_Date;
                var hour = resdateReceive[1].split(":");

                if (statusdata = true) {
                    if (displaytype == '15') {
                        html += '<td>' + data[i].On_Date +'</td> '
                        html += '<td>' + data[i].On_time.substring(0, 5); + '</td> '
                        if (data[i].DataDo < 2) {
                            html += '<td>2.00</td> '
                        } else {
                            html += '<td>' + data[i].DataDo + '</td> '
                        }

                        html += '<td>' + data[i].DataConductivity + '</td> '

                        if (data[i].pH > 8.5) {
                            html += '<td> 8.50 </td> '
                        }
                        else if (data[i].pH < 6.5) {
                            html += '<td> 6.50 </td> '
                        }
                        else {
                            html += '<td>' + data[i].pH + '</td> '
                        }

                        html += '<td>' + data[i].Temp + '</td> '
                        html += '<td>' + data[i].Salinity + '</td> '
                        html += '<td>' + data[i].TDS + '</td> '

                        if (data[i].Flow == '0.00' && data[i].velocity == '0.00') {
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '

                        }
                        else {

                            html += '<td>' + data[i].Level_water + '</td> '

                            html += '<td>' + data[i].Flow + '</td> '

                            html += '<td>' + data[i].velocity + '</td> '


                        }
                    } 
                    else if (displaytype == '60') {
                       
                        html += '<td>' + resdateReceive[0] + '</td> '
                        html += '<td>' + resdateReceive[1] + '</td> '
                        if (data[i].DataDo < 2) {
                            html += '<td>2.00</td> '
                        }
                        else {
                            html += '<td>' + data[i].DataDo + '</td> '
                        }

                        html += '<td>' + data[i].DataConductivity + '</td> '

                        if (data[i].pH > 8.5) {
                            html += '<td> 8.50 </td> '
                        }
                        else if (data[i].pH < 6.5) {
                            html += '<td> 6.50 </td> '
                        }
                        else {
                            html += '<td>' + data[i].pH + '</td> '
                        }

                        html += '<td>' + data[i].Temp + '</td> '
                        html += '<td>' + data[i].Salinity + '</td> '
                        html += '<td>' + data[i].TDS + '</td> '

                        if (data[i].Flow == '0.00' && data[i].velocity == '0.00') {
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '

                        }
                        else {

                            html += '<td>' + data[i].Level_water + '</td> '

                            html += '<td>' + data[i].Flow + '</td> '

                            html += '<td>' + data[i].velocity + '</td> '


                        }
                    }
                    else {
                        html += '<td>' + data[i].On_Date + '</td> '
                        html += '<td>' + data[i].On_time.substring(0, 5); + '</td> '
                        if (data[i].DataDo < 2) {
                            html += '<td>2.00</td> '
                        } else {
                            html += '<td>' + data[i].DataDo + '</td> '
                        }

                        html += '<td>' + data[i].DataConductivity + '</td> '

                        if (data[i].pH > 8.5) {
                            html += '<td> 8.50 </td> '
                        }
                        else if (data[i].pH < 6.5) {
                            html += '<td> 6.50 </td> '
                        }
                        else {
                            html += '<td>' + data[i].pH + '</td> '
                        }

                        html += '<td>' + data[i].Temp + '</td> '
                        html += '<td>' + data[i].Salinity + '</td> '
                        html += '<td>' + data[i].TDS + '</td> '

                        if (data[i].Flow == '0.00' && data[i].velocity == '0.00') {
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '

                        }
                        else {

                            html += '<td>' + data[i].Level_water + '</td> '

                            html += '<td>' + data[i].Flow + '</td> '

                            html += '<td>' + data[i].velocity + '</td> '


                        }
                    }
                    
                    //html += '<td>' + data[i].Area + ' </td> '

                }

                html += '\r\n </tr>';
            }



            $.ajax({
                type: "POST",
                url: "/Home/Getvaluedatawater",
                data: { 'station': codestation, 'displaylist': displaytype, 'fromdate': fromdate, 'todate': todate, 'showtype': showtype },
                dataType: "json",
                success: function (data2) {

                    i = 0;
                    for (i = 0; i < data2.length; i++) {
                        var namecol = '';
                        if (i == 0) {
                            namecol = 'ค่าสูงสุด'
                            html += '<tr  style="background-color:#2E75B6;">'
                        }
                        else if (i == 1) {
                            namecol = 'ค่าต่ำสุด'
                            html += '<tr style="background-color:#9DC3E6;">'
                        }
                        //else if (i == 2) {
                        //    namecol = 'ค่าผลรวม'
                        //}
                        else if (i == 2) {
                            namecol = 'ค่าเฉลี่ย'
                            html += '<tr style="background-color:#BDD7EE;">'
                        }

                        //console.log(data2);


                        html += '<td colspan="2">' + namecol + '</td> '

                        if (data2[i].DataDo < 2) {
                            html += '<td>2.00</td> '
                        } else {
                            html += '<td>' + data2[i].DataDo + '</td> '
                        }
                        html += '<td>' + data2[i].DataConductivity + '</td> '

                        if (data2[i].pH >= 8.5) {
                            html += '<td> 8.50 </td> '
                        }
                        else if (data2[i].pH <= 6.5) {
                            html += '<td> 6.50 </td> '
                        }
                        else {
                            html += '<td>' + data2[i].pH + ' </td> '
                        }

                        html += '<td>' + data2[i].Temp + ' </td> '
                        html += '<td>' + data2[i].Salinity + ' </td> '
                        html += '<td>' + data2[i].TDS + ' </td> '

                        if (data2[i].Flow == '0.00' && data2[i].velocity == '0.00') {
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '
                            html += '<td>N/A</td> '
                        }
                        else {
                            html += '<td>' + data2[i].Level_water + ' </td> '
                            html += '<td>' + data2[i].Flow + ' </td> '
                            html += '<td>' + data2[i].velocity + ' </td> '

                        }
                        //html += '<td>' + data2[i].length + ' </td> '
                        html += '\r\n </tr>';
                    }
                    $('.data-table tbody').append(html)
                },
                error: function (result) {
                    //alert(result);
                    html += '<tr>'
                    html += '<td colspan="12">  ไม่พบข้อมูล </td> '
                    html += '\r\n </tr>';
                    $('.data-table tbody').append(html)
                }
            });


            $('#Location').empty();
            $('#latlong').empty();
            $('#entrance').empty();


            $('#Location').append('<i class="glyphicon glyphicon-home"></i> ต.' + data[0].address1 + ' อ.' + data[0].address2 + ' จ.' + data[0].address3 + '');
            $('#latlong').append('<i class="glyphicon glyphicon-map-marker"></i> <a href="https://www.google.com/maps/?q=' + data[0].stationLat + "," + data[0].stationLong + '" target="_blank">' + data[0].stationLat + "," + data[0].stationLong + '</a>');
            $('#entrance').append('<i class="glyphicon glyphicon-road"></i> ระยะห่างจากทะเล ' + data[0].Entrance + ' กม.');

        },
        error: function (result) {
            //alert('eerr' + result);

        }
    });

}

function Getdata(page, Codestation) {
    var i = 0;
    var htmlwrite;
    $.ajax({
        type: "POST",
        url: "/Home/GetStation",
        dataType: "json",
        success: function (data) {

            if (page == '1') {
                showdisplay(data);
            }
            else if (page == '2') {
                getstation(data, Codestation);
            }
        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function Getdatastation(Codestation) {
    var i = 0;
    var htmlwrite;
    $.ajax({
        type: "POST",
        url: "/Home/getstationlist",
        dataType: "json",
        success: function (data) {
            getstation(data, Codestation);

        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function getstation(Station, code) {
    var html;
    var countstation;
    html = '';

    var res = code.split("P");
    var numofstation = parseInt(res[1]);


    $("#P_StationName").html(Station[(numofstation - 1)].stationName);


    for (countstation = 0; countstation < Station.length; countstation++) {/*' ต.' + Station[countstation].address1 + ' อ.' + Station[countstation].address2 + ' จ.' + Station[countstation].address3 + '*/
        html += '<option value="' + Station[countstation].Codestation + '">' + Station[countstation].stationName + '</option>';
    }

    $('#selectstation').append(html);

    document.getElementById("selectstation").value = code;

}

function GetChartWaterStation(codestation, displaytype, fromdate, todate, showtype) {
    //    $("#P_StationName").html($("#selectstation option:selected").text());
    //    document.getElementById("imgstation").src = "img/" + codestation + ".jpg";
    var ddd;
    $.ajax({
        type: "POST",
        url: "/Home/StationDatawater",
        data: { 'station': codestation, 'displaylist': displaytype, 'fromdate': fromdate, 'todate': todate, 'showtype': showtype },
        dataType: "json",
        success: function (data) {
            ChartLevel(data);
        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function ChartLevel(indata) {
    var dataPoints = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var dataPoints6 = [];
    var dataPoints7 = [];
    var dataPoints8 = [];
    var dataPoints9 = [];
    var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    CanvasJS.addCultureInfo("th",
        {
            decimalSeparator: ".",// Observe ToolTip Number Format
            digitGroupSeparator: ".", // Observe axisY labels                   
            months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

        });
    var ChartDataDo = new CanvasJS.Chart("DataDo", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ออกซิเจนในน้ำ"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },
        toolTip: {
            shared: true,
             animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: {
            title: "mg/l"
        },
        data: [{
            type: "spline",
            markerType: "square",
            name: "ออกซิเจนในน้ำ",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            yValueFormatString: "##.## mg/l",
            dataPoints: dataPoints
        }]

    });

    var ChartDataConductivity = new CanvasJS.Chart("DataConductivity", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าการนำไฟฟ้า"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },
        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: {
            title: "µS/cm"
        },
        data: [{
            type: "spline",
            markerType: "square",
            name: "ความนำไฟฟ้า",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            yValueFormatString: "###.## µS/cm",
            dataPoints: dataPoints2
        }]

    });

    var Chartph = new CanvasJS.Chart("ph", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่ากรด - ด่าง"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },
        legend: {
            cursor: "pointer"
        },
        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        axisY: {
            title: "pH"
        },
        data: [{
            type: "spline",
            markerType: "square",
            name: "กรด - ด่าง",
            showInLegend: true,
            yValueFormatString: "###.##",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            dataPoints: dataPoints3

        }]

    });

    var Chartlevel = new CanvasJS.Chart("Level_water", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าระดับน้ำ"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },
        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: {
            title: "MSL."
        },
        data: [{
            type: "spline",
            markerType: "square",
            name: "ระดับน้ำ",
            showInLegend: true,
            xValueFormatString: "DD MMMM YYYY HH:mm",
            yValueFormatString: "#0.## m.(MSL.)",
            dataPoints: dataPoints6
        }
        ]
    });

    var chartSalinity = new CanvasJS.Chart("Salinity", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าความเค็ม"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },
        toolTip: {
            shared: true,
        },
        legend: {
            cursor: "pointer"
        },
        axisY: {
            title: "g/l"
        },
        data: [{
            type: "spline",
            markerType: "square",
            name: "ความเค็ม", 
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            yValueFormatString: "#0.## g/l",
            dataPoints: dataPoints5
        }]

    });

    var chartTDS = new CanvasJS.Chart("TDS", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าสารละลาย"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },

        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: [
            {

                title: "mg/l"
            }

        ],
        data: [{
            type: "spline",
            markerType: "square",
            name: "สารละลาย",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            yValueFormatString: "0.## mg/l",
            dataPoints: dataPoints8
        }]

    });

    var chartFlow = new CanvasJS.Chart("Flow", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าอัตราการไหล"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },

        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: [
            {

                title: "m3/s"
            }

        ],
        data: [{
            type: "spline",
            markerType: "square",
            name: "อัตราการไหล",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            yValueFormatString: "#0.## m3/s",
            dataPoints: dataPoints7
        }]

    });

    var chartvelocity = new CanvasJS.Chart("velocity", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าอัตราความเร็ว"
        }, culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },

        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: [
            {

                title: "m/s"
            }

        ],
        data: [{
            type: "spline",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            markerType: "square",
            name: "อัตราความเร็ว",
            showInLegend: true,
            yValueFormatString: "##0.## m/ s",
            dataPoints: dataPoints9
        }]

    });

    var chartTemp = new CanvasJS.Chart("temp", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "ค่าอุณหภูมิ"
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour",
            title: "เวลา"
        },

        toolTip: {
            shared: true,
            animationEnabled: true //disable here
        },
        legend: {
            cursor: "pointer"
        },
        axisY: [
            {

                title: "°C"
            }

        ],
        data: [{
            type: "spline",
        markerType: "square",
            name: "อุณหภูมิ",
            xValueFormatString: "DD MMMM YYYY HH:mm",
        showInLegend: true,
        yValueFormatString: "###.## °C",
        dataPoints: dataPoints4
        }]

    });
    
    for (var i = 0; i < indata.length; i++) {
        
            dataPoints.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].DataDo)
            });
       
            dataPoints2.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].DataConductivity)
            });
          dataPoints3.push({
              x: new Date(indata[i].On_Datetime),
              y: parseFloat(indata[i].pH)
            });
        
            dataPoints4.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].Temp)
            });
       
            dataPoints5.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].Salinity)
            });
       
            dataPoints6.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].Level_water)
            });
        
       
            dataPoints7.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].Flow)
            });
        
            dataPoints8.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].TDS)
            });
       
            dataPoints9.push({
                x: new Date(indata[i].On_Datetime),
                y: parseFloat(indata[i].velocity)
            });
        
    }

    if (indata[0].DataDo != null) {
        ChartDataDo.render();
        $("#DataDo").css("display", "block");
    }
    else {

        $("#DataDo").css("display", "none");
    }
    if (indata[0].DataConductivity != null) {
        ChartDataConductivity.render();
        $("#DataConductivity").css("display", "block");
    }
    else {

        $("#DataConductivity").css("display", "none");
    }
    if (indata[0].pH != null) {
        Chartph.render();
        $("#ph").css("display", "block");
    }
    else {

        $("#ph").css("display", "none");
    }
    if (indata[0].Temp != null) {
        chartTemp.render();
        $("#temp").css("display", "block");
    }
    else {

        $("#temp").css("display", "none");
    }
    if (indata[0].Salinity != null) {
        chartSalinity.render();
        $("#Salinity").css("display", "block");
    }
    else {

        $("#Salinity").css("display", "none");
    }
    if (indata[0].Level_water != null) {
        Chartlevel.render();
        $("#Level_water").css("display", "block");
    }
    else {

        $("#Level_water").css("display", "none");
    }
    if (indata[0].Flow != null) {
        chartFlow.render();
        $("#Flow").css("display", "block");
    }
    else {

        $("#Flow").css("display", "none");
    } 
    if (indata[0].TDS != null) {
        chartTDS.render();
        $("#TDS").css("display", "block");
    }
    else {

        $("#TDS").css("display", "none");
    }
    if (indata[0].velocity != null) {
        chartvelocity.render();
        $("#velocity").css("display", "block");
    }
    else {

        $("#velocity").css("display", "none");
    }


}

function GetChartWater(codestation, displaytype, fromdate, todate, parameter) {
    //    $("#P_StationName").html($("#selectstation option:selected").text());
    //    document.getElementById("imgstation").src = "img/" + codestation + ".jpg";
    var ddd;
    $.ajax({
        type: "POST",
        url: "/Home/GraphDataStation",
        data: { 'station': codestation, 'displaylist': displaytype, 'daystart': fromdate, 'dayend': todate, 'parameter': parameter },
        dataType: "json",
        success: function (data) {
            Chartcompare(data);
        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function Chartcompare(datas) {
    var maindata = [];
    var dataPoints = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var dataPoints6 = [];
    var dataPoints7 = [];
    var dataPoints8 = [];
    var dataPoints9 = [];

    CanvasJS.addCultureInfo("th",
        {
            decimalSeparator: ".",// Observe ToolTip Number Format
            digitGroupSeparator: ".", // Observe axisY labels                   
            months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

        });

    var chart = new CanvasJS.Chart("chartstation", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "เปรียบเทียบพารามิเตอร์ ในลุ่มน้ำปราจีน - บางประกง "
        },
        culture: "th",
        axisX: {
            showFirstLabel: true,
            showLastLabel: true,
            type: 'datetime',
            valueFormatString: "DD MMMM YYYY HH:mm",
            labelAngle: -5,
            interval: 3,
            intervalType: "hour"
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        axisY: [
            {

                title: "ออกซิเจนในน้ำ",
                lineColor: "#369EAD",
                titleFontColor: "#369EAD",
                labelFontColor: "#369EAD"
            },
            {

                title: "ความนำไฟฟ้า",
                lineColor: "#C24642",
                titleFontColor: "#C24642",
                labelFontColor: "#C24642"
            }
            ,
            {

                title: "ความเค็ม",
                lineColor: "#8B008B",
                titleFontColor: "#8B008B",
                labelFontColor: "#8B008B"
            },
            {

                title: "กรด - ด่าง",
                lineColor: "#7FFF00",
                titleFontColor: "#7FFF00",
                labelFontColor: "#7FFF00"
            },
            {

                title: "สารละลาย",
                lineColor: "#4682B4",
                titleFontColor: "#4682B4",
                labelFontColor: "#4682B4"
            }

        ],
        axisY2: [

            {

                title: "อุณหภูมิ",
                lineColor: "#00FFFF",
                titleFontColor: "#00FFFF",
                labelFontColor: "#00FFFF"
            },
            {

                title: "ระดับน้ำ",
                lineColor: "#9ACD32",
                titleFontColor: "#9ACD32",
                labelFontColor: "#9ACD32"
            },
            {

                title: "อัตราการไหล",
                lineColor: "#FF4500",
                titleFontColor: "#FF4500",
                labelFontColor: "#FF4500"
            },
            {

                title: "อัตราความเร็ว",
                lineColor: "#D2B48C",
                titleFontColor: "#D2B48C",
                labelFontColor: "#D2B48C"
            }
        ],
        data: maindata

    });


    if (datas[0].DataDo != null) {
        maindata.push({
            type: "spline",
            markerType: "square",
            name: "ออกซิเจนในน้ำ",
            showInLegend: true,
            color: "#369EAD",
            axisYIndex: 0,
            xValueFormatString: "DD MMMM YYYY HH:mm",
            yValueFormatString: "ออกซิเจนในน้ำ ###.## mg/l",
            dataPoints: dataPoints
        });
    }
    if (datas[0].DataConductivity != null) {
        maindata.push({
            type: "spline",
            markerType: "square",
            name: "ความนำไฟฟ้า",
            showInLegend: true,
            color: "#C24642",
            axisYIndex: 1,
            xValueFormatString: "DD MMMM YYYY HH:mm",
            yValueFormatString: "ความนำไฟฟ้า ###.## µS/cm",
            dataPoints: dataPoints2
        });

    }
    if (datas[0].pH != null) {
        maindata.push({
            type: "spline",
            markerType: "square",
            name: "กรด - ด่าง",
            showInLegend: true,
            color: "#7FFF00",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            yValueFormatString: "กรด - ด่าง ###.##",
            axisYIndex: 3,
            dataPoints: dataPoints3

        });
    }
    if (datas[0].Temp != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            name: "อุณหภูมิ",
            showInLegend: true,
            color: " #00FFFF",
            axisYType: "secondary",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            axisYIndex: 0,
            yValueFormatString: "อุณหภูมิ ###.## °C",
            dataPoints: dataPoints4
        });
    }
    if (datas[0].Salinity != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            name: "ความเค็ม",
            color: "#8B008B",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            showInLegend: true,
            axisYIndex: 2,
            yValueFormatString: "ความเค็ม #0.## g/l",
            dataPoints: dataPoints5
        });
    }
    if (datas[0].Level_water != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            name: "ระดับน้ำ",
            showInLegend: true,
            color: "#9ACD32",
            axisYType: "secondary",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            axisYIndex: 1,
            yValueFormatString: "ระดับน้ำ #0.## m.(MSL.)",
            dataPoints: dataPoints6
        });
    }
    if (datas[0].Flow != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            name: "อัตราการไหล",
            color: "#FF4500",
            showInLegend: true,
            axisYType: "secondary",
            axisYIndex: 2,
            xValueFormatString: "DD MMMM YYYY HH:mm",
            yValueFormatString: "อัตราการไหล #0.## m.(m3/s)",
            dataPoints: dataPoints7
        });
    }
    if (datas[0].TDS != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            name: "สารละลาย",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            color: "#4682B4",
            showInLegend: true,
            yValueFormatString: "สารละลาย ###.## mg/l",
            axisYIndex: 4,
            dataPoints: dataPoints8
        });
    }
    if (datas[0].velocity != null) {

        maindata.push({
            type: "spline",
            markerType: "square",
            xValueFormatString: "DD MMMM YYYY HH:mm",
            name: "อัตราความเร็ว",
            color: "#D2B48C",
            showInLegend: true,
            axisYType: "secondary",
            yValueFormatString: "อัตราความเร็ว ###.## m/s",
            axisYIndex: 3,
            dataPoints: dataPoints9
        });
    }



    for (var i = 0; i < datas.length; i++) {


        if (datas[0].DataDo != null) {

            dataPoints.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].DataDo)
            });
        }
        if (datas[0].DataConductivity != null) {

            dataPoints2.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].DataConductivity)
            });
        }
        if (datas[0].pH != null) {

            dataPoints3.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].pH)
            });
        }
        if (datas[0].Temp != null) {

            dataPoints4.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].Temp)
            });
        }
        if (datas[0].Salinity != null) {

            dataPoints5.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].Salinity)
            });
        }
        if (datas[0].Level_water != null) {

            dataPoints6.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].Level_water)
            });
        }
        if (datas[0].Flow != null) {

            dataPoints7.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].Flow)
            });
        }
        if (datas[0].TDS != null) {

            dataPoints8.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].TDS)
            });
        }
        if (datas[0].velocity != null) {

            dataPoints9.push({
                x: new Date(datas[i].On_Datetime),
                y: parseFloat(datas[i].velocity)
            });
        }
    }

    chart.render();
    var s = 0;
    //left
    for (var station = 0; station < chart.axisY.length - s; station++) {
        if (datas[0].DataDo == null) {
            chart.axisY[station].remove();
            s++;
        } else {
            station++;
        }
        if (datas[0].DataConductivity == null) {
            chart.axisY[station].remove();
            s++;
        } else {
            station++;
        }
        if (datas[0].Salinity == null) {

            chart.axisY[station].remove();
            s++;
        } else {
            station++;
        }

        if (datas[0].pH == null) {
            chart.axisY[station].remove();
            s++;
        } else {
            station++;
        }

        if (datas[0].TDS == null) {

            chart.axisY[station].remove();
            s++;
        } else {
            station++;
        }

    }
    s = 0;
    //right
    for (var station = 0; station < chart.axisY2.length - s; station++) {
        if (datas[0].Temp == null) {
            chart.axisY2[station].remove();
            s++;
        } else {
            station++;
        }
        if (datas[0].Level_water == null) {
            chart.axisY2[station].remove();
            s++;
        }
        else {
            station++;
        }
        if (datas[0].Flow == null) {
            chart.axisY2[station].remove();
            s++;

        }
        else {
            station++;
        }
        if (datas[0].velocity == null) {
            chart.axisY2[station].remove();
            s++;

        }
        else {
            station++;
        }
    }



    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}

function GetchartStaion(codestation, displaytype, fromdate, todate, parameter) {
    $.ajax({
        type: "POST",
        url: "/Home/GraphData",
        data: { 'station': codestation, 'displaylist': displaytype, 'daystart': fromdate, 'dayend': todate, 'parameter': parameter },
        dataType: "json",
        success: function (data) {
            ChartcompareStation(data)
        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function ChartcompareStation(datas) {
    var maindata0 = [];
    var maindata1 = [];
    var maindata2 = [];
    var maindata3 = [];
    var maindata4 = [];
    var maindata5 = [];
    var maindata6 = [];
    var maindata7 = [];
    var maindata8 = [];
    var dataPoints = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var dataPoints6 = [];
    var dataPoints7 = [];
    var dataPoints8 = [];
    var dataPoints9 = [];
    var dataPoints10 = [];
    var dataPoints11 = [];
    var dataPoints12 = [];
    var dataPoints13 = [];
    var dataPoints14 = [];
    var dataPoints15 = [];
    var dataPoints16 = [];
    var dataPoints17 = [];
    var dataPoints18 = [];
    var dataPoints19 = [];
    var dataPoints20 = [];
    var dataPoints21 = [];
    var dataPoints22 = [];
    var dataPoints23 = [];
    var dataPoints24 = [];
    var dataPoints25 = [];
    var dataPoints26 = [];
    var dataPoints27 = [];
    var dataPoints28 = [];
    var dataPoints29 = [];
    var dataPoints30 = [];
    var dataPoints31 = [];
    var dataPoints32 = [];
    var dataPoints33 = [];
    var dataPoints34 = [];
    var dataPoints35 = [];
    var dataPoints36 = [];
    var dataPoints37 = [];
    var dataPoints38 = [];
    var dataPoints39 = [];
    var dataPoints40 = [];
    var dataPoints41 = [];
    var dataPoints42 = [];
    var dataPoints43 = [];
    var dataPoints44 = [];
    var dataPoints45 = [];
    var dataPoints46 = [];
    var dataPoints47 = [];
    var dataPoints48 = [];
    var dataPoints49 = [];
    var dataPoints50 = [];
    var dataPoints51 = [];
    var dataPoints52 = [];
    var dataPoints53 = [];
    var dataPoints54 = [];
    var dataPoints55 = [];
    var dataPoints56 = [];
    var dataPoints57 = [];
    var dataPoints58 = [];
    var dataPoints59 = [];
    var dataPoints60 = [];
    var dataPoints61 = [];
    var dataPoints62 = [];
    var dataPoints63 = [];
    var dataPoints64 = [];
    var dataPoints65 = [];
    var dataPoints66 = [];
    var dataPoints67 = [];
    var dataPoints68 = [];
    var dataPoints69 = [];
    var dataPoints70 = [];
    var dataPoints71 = [];
    var dataPoints72 = [];
    var dataPoints73 = [];
    var dataPoints74 = [];
    var dataPoints75 = [];
    var dataPoints77 = [];
    var dataPoints78 = [];
    var dataPoints79 = [];
    var dataPoints80 = [];
    var dataPoints81 = [];

    if (datas[0].DataDo != null) {
        var chartDo = new CanvasJS.Chart("chartDataDo", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าออกซิเจนในน้ำสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "ออกซิเจนในน้ำ",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata0

        });
    }
    if (datas[0].DataConductivity != null) {
        var chartDataConductivity = new CanvasJS.Chart("chartConductivity", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าความนำไฟฟ้าสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "ความนำไฟฟ้า",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata1

        });
    }
    if (datas[0].pH != null) {
        var charPh = new CanvasJS.Chart("chartph", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่า กรด - ด่าง สถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "กรด - ด่าง",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata2

        });
    }
    if (datas[0].Temp != null) {
        var chartTemp = new CanvasJS.Chart("charttemp", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าอุณหภูมิสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "อุณหภูมิ",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata3

        });
    }
    if (datas[0].Salinity != null) {
        var chartSalinity = new CanvasJS.Chart("chartSalinity", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าความเค็มสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "ความเค็ม",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata4

        });
    }
    if (datas[0].Level_water != null) {
        var chartLevelwater = new CanvasJS.Chart("chartLevel_water", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าระดับน้ำสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "ระดับน้ำ",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata5

        });
    }
    if (datas[0].Flow != null) {
        var chartFlow = new CanvasJS.Chart("chartFlow", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าอัตราการไหลสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "อัตราการไหล",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata6

        });
    }
    if (datas[0].TDS != null) {
        var chartTDS = new CanvasJS.Chart("chartTDS", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าของแข็งละลายน้ําสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "ของแข็งละลายน้ํา",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata7

        });
    }
    if (datas[0].velocity != null) {
        var chartvelocity = new CanvasJS.Chart("chartvelocity", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "ค่าอัตราความเร็วสถานีตรวจวัดคุณภาพน้ำและปริมาณน้ำ ในลุ่มน้ำปราจีน - บางประกง "
            },
            culture: "th",
            axisX: {
                showFirstLabel: true,
                showLastLabel: true,
                type: 'datetime',
                valueFormatString: "DD MMMM YYYY HH:mm",
                labelAngle: -5,
                interval: 3,
                intervalType: "hour"
            },

            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            axisY: [
                {

                    title: "อัตราความเร็ว",
                    lineColor: "#369EAD",
                }

            ],
            data: maindata8

        });
    }

    var code = "";
    for (var i = 0; i < datas.length; i++) {


        if (datas[i].Codestation == 'SP01') {
            code = "สถานีวัดบางคาง"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints
                    });
                }
                dataPoints.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints2
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints2
                    });
                }
                dataPoints2.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",


                        dataPoints: dataPoints3
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",


                        dataPoints: dataPoints3
                    });
                }
                dataPoints3.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",

                        dataPoints: dataPoints4
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",

                        dataPoints: dataPoints4
                    });
                }
                dataPoints4.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints5
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints5
                    });
                }
                dataPoints5.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",


                        dataPoints: dataPoints6
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints6
                    });
                }
                dataPoints6.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints7
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints7
                    });
                }
                dataPoints7.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",


                        dataPoints: dataPoints8
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints8
                    });
                }
                dataPoints8.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",

                        dataPoints: dataPoints9
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints9
                    });
                }
                dataPoints9.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }

        }
        if (datas[i].Codestation == 'SP02') {
            code = "สถานีวัดมูลเหล็ก"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints10
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints10
                    });
                }
                dataPoints10.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",


                        dataPoints: dataPoints11
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",


                        dataPoints: dataPoints11
                    });
                }
                dataPoints11.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints12
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints12
                    });
                }
                dataPoints12.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints13
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints13
                    });
                }
                dataPoints13.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints14
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints14
                    });
                }
                dataPoints14.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints15
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints15
                    });
                }
                dataPoints15.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints16
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints16
                    });
                }
                dataPoints16.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints17
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints17
                    });
                }
                dataPoints17.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints18
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints18
                    });
                }
                dataPoints18.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP03') {
            code = "สถานีสะพานโยธะกา"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",


                        dataPoints: dataPoints19
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints19
                    });
                }
                dataPoints19.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",


                        dataPoints: dataPoints20
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints20
                    });
                }
                dataPoints20.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints21
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints21
                    });
                }
                dataPoints21.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints22
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints22
                    });
                }
                dataPoints22.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints23
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints23
                    });
                }
                dataPoints23.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints24
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints24
                    });
                }
                dataPoints24.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints25
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints25
                    });
                }
                dataPoints25.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints26
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints26
                    });
                }
                dataPoints26.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints27
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints27
                    });
                }
                dataPoints27.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP04') {
            code = "สถานีวัดบางแตน"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: "###.## mg/l",

                        dataPoints: dataPoints28
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints28
                    });
                }
                dataPoints28.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints29
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints29
                    });
                }
                dataPoints29.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints30
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints30
                    });
                }
                dataPoints30.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints31
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints31
                    });
                }
                dataPoints31.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints32
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints32
                    });
                }
                dataPoints32.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints33
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints33
                    });
                }
                dataPoints33.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints34
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints34
                    });
                }
                dataPoints34.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints35
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints35
                    });
                }
                dataPoints35.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints36
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints36
                    });
                }
                dataPoints36.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP05') {
            code = "สถานีวัดปากคลองบางขนาก"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints37
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints37
                    });
                }
                dataPoints37.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints38
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints38
                    });
                }
                dataPoints38.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints39
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints39
                    });
                }
                dataPoints39.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints40
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints40
                    });
                }
                dataPoints40.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints41
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints41
                    });
                }
                dataPoints41.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints42
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints42
                    });
                }
                dataPoints42.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints43
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints43
                    });
                }
                dataPoints43.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints44
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints44
                    });
                }
                dataPoints44.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints45
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints45
                    });
                }
                dataPoints45.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP06') {
            code = "สถานีบางกระเจ็ด"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints46
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints46
                    });
                }
                dataPoints46.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints47
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints47
                    });
                }
                dataPoints47.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints48
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints48
                    });
                }
                dataPoints48.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints49
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints49
                    });
                }
                dataPoints49.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints50
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints50
                    });
                }
                dataPoints50.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints51
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints51
                    });
                }
                dataPoints51.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints52
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints52
                    });
                }
                dataPoints52.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints53
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints53
                    });
                }
                dataPoints53.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints54
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints54
                    });
                }
                dataPoints54.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP07') {
            code = "สถานีวัดใหม่บางคล้า"
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints55
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints55
                    });
                }
                dataPoints55.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints56
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints56
                    });
                }
                dataPoints56.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints57
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints57
                    });
                }
                dataPoints57.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints58
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints58
                    });
                }
                dataPoints58.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints59
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints59
                    });
                }
                dataPoints59.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints60
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints60
                    });
                }
                dataPoints60.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints61
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints61
                    });
                }
                dataPoints61.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints62
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints62
                    });
                }
                dataPoints62.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints63
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints63
                    });
                }
                dataPoints63.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP08') {
            code = "สถานีเทศบาลเมืองฉะเชิงเทรา";
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints64
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints64
                    });
                }
                dataPoints64.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints65
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints65
                    });
                }
                dataPoints65.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints66
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints66
                    });
                }
                dataPoints66.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints67
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints67
                    });
                }
                dataPoints67.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints68
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints68
                    });
                }
                dataPoints68.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints69
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints69
                    });
                }
                dataPoints69.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints70
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints70
                    });
                }
                dataPoints70.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints71
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints71
                    });
                }
                dataPoints71.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints72
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints72
                    });
                }
                dataPoints72.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }
        if (datas[i].Codestation == 'SP09') {
            code = "สถานีชลประทานฉะเชิงเทรา";
            if (datas[0].DataDo != null) {
                if (i == 0) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints73
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata0.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ออกซิเจนในน้ำ",
                        yValueFormatString: " ###.## mg/l",

                        dataPoints: dataPoints73
                    });
                }
                dataPoints73.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataDo)
                });

            }
            if (datas[0].DataConductivity != null) {
                if (i == 0) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints74
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata1.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความนำไฟฟ้า",
                        yValueFormatString: "###.## µS/cm",
                        dataPoints: dataPoints74
                    });
                }
                dataPoints74.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].DataConductivity)
                });
            }
            if (datas[0].pH != null) {
                if (i == 0) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",

                        dataPoints: dataPoints75
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata2.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>กรด - ด่าง",
                        yValueFormatString: " ###.##",
                        dataPoints: dataPoints75
                    });
                }
                dataPoints75.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].pH)
                });
            }
            if (datas[0].Temp != null) {

                if (i == 0) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints76
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata3.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อุณหภูมิ",
                        yValueFormatString: " ###.## °C",
                        dataPoints: dataPoints76
                    });
                }
                dataPoints76.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Temp)
                });
            }
            if (datas[0].Salinity != null) {

                if (i == 0) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints77
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata4.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ความเค็ม",
                        yValueFormatString: "#0.## g/l",
                        dataPoints: dataPoints77
                    });
                }
                dataPoints77.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Salinity)
                });
            }
            if (datas[0].Level_water != null) {

                if (i == 0) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints78
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata5.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ระดับน้ำ",
                        yValueFormatString: "#0.## m.(MSL.)",

                        dataPoints: dataPoints78
                    });
                }
                dataPoints78.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Level_water)
                });
            }
            if (datas[0].Flow != null) {

                if (i == 0) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints79
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata6.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>อัตราการไหล",
                        yValueFormatString: "#0.## m.(m3/s)",
                        dataPoints: dataPoints79
                    });
                }
                dataPoints79.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].Flow)
                });
            }
            if (datas[0].TDS != null) {

                if (i == 0) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints80
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata7.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br>ของแข็งละลายน้ํา",
                        yValueFormatString: " ###.## mg/l",
                        dataPoints: dataPoints80
                    });
                }
                dataPoints80.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].TDS)
                });
            }
            if (datas[0].velocity != null) {

                if (i == 0) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints81
                    });
                }
                else if (datas[i].Codestation != datas[i - 1].Codestation) {
                    maindata8.push({
                        type: "spline",
                        markerType: "square",
                        name: code,
                        showInLegend: true,
                        xValueFormatString: "DD MMMM YYYY HH:mm <br> อัตราความเร็ว",
                        yValueFormatString: " ###.## m/s",
                        dataPoints: dataPoints81
                    });
                }
                dataPoints81.push({
                    x: new Date(datas[i].On_Datetime),
                    y: parseFloat(datas[i].velocity)
                });
            }
        }

    }

    if (datas[0].DataDo != null) {
        chartDo.render();
        $("#chartDataDo").css("display", "block");
    }
    else {

        $("#chartDataDo").css("display", "none");
    }
    if (datas[0].DataConductivity != null) {
        chartDataConductivity.render();
        $("#chartConductivity").css("display", "block");
    }
    else {

        $("#chartConductivity").css("display", "none");
    }
    if (datas[0].pH != null) {
        charPh.render();
        $("#chartph").css("display", "block");
    }
    else {

        $("#chartph").css("display", "none");
    }
    if (datas[0].Temp != null) {
        chartTemp.render();
        $("#charttemp").css("display", "block");
    }
    else {

        $("#charttemp").css("display", "none");
    }
    if (datas[0].Salinity != null) {
        chartSalinity.render();
        $("#chartSalinity").css("display", "block");
    }
    else {

        $("#chartSalinity").css("display", "none");
    }
    if (datas[0].Level_water != null) {
        chartLevelwater.render();
        $("#chartLevel_water").css("display", "block");
    }
    else {

        $("#chartLevel_water").css("display", "none");
    }
    if (datas[0].Flow != null) {
        chartFlow.render();
        $("#chartFlow").css("display", "block");
    }
    else {

        $("#chartFlow").css("display", "none");
    } chartTDS
    if (datas[0].TDS != null) {
        chartTDS.render();
        $("#chartTDS").css("display", "block");
    }
    else {

        $("#chartTDS").css("display", "none");
    }
    if (datas[0].velocity != null) {
        chartvelocity.render();
        $("#chartvelocity").css("display", "block");
    }
    else {

        $("#chartvelocity").css("display", "none");
    }


}