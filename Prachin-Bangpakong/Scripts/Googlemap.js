var markers = [];
function initialize(codestation) {

    $.ajax({
        type: "POST",
        url: "/Home/GetoneStation",
        data: { 'station': codestation},
        dataType: "json",
        success: function (data) {

            var mapOptions = {
                zoom: 10, // ขนาดการซูม
                center: new google.maps.LatLng(data[0].stationLat, data[0].stationLong),  //Set จุดกึ่งกลางของ Google Map ถ้าไม่ใส่ Map ไม่ขึ้น
                mapTypeId: google.maps.MapTypeId.HYBRID//'satellite'//google.maps.MapTypeId.ROADMAP
                , scrollwheel: false // ปิดเลื่อนขยาย
                //, draggable: false // ปิดการ Drag Mouse
            }
            var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);



            var marker, i;
            
            var urlicon = "";
            
                urlicon = "/img/icon/icon_buttonbBK01.png";
                
                var icon = {
                    url: urlicon, // url

                    scaledSize: new google.maps.Size(20, 20), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[0].stationLat, data[0].stationLong),
                    map: map,
                    icon: icon
                });

               



                markers.push(marker);
            

        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function getmapshow() {

    $.ajax({
        type: "POST",
        url: "/Home/GetStation",
        dataType: "json",
        success: function (data) {

            var mapOptions = {
                zoom: 10, // ขนาดการซูม
                center: new google.maps.LatLng(13.814152, 101.182249),  //Set จุดกึ่งกลางของ Google Map ถ้าไม่ใส่ Map ไม่ขึ้น
                mapTypeId: google.maps.MapTypeId.HYBRID//'satellite'//google.maps.MapTypeId.ROADMAP
                , scrollwheel: false // ปิดเลื่อนขยาย
                //, draggable: false // ปิดการ Drag Mouse
            }
            var map = new google.maps.Map(document.getElementById("showgooglemap"), mapOptions);



            var marker, i;
            var infowindow = new google.maps.InfoWindow();


            var Content = "";
            var urlicon = "";
            for (i = 0; i < data.length; i++) {

                var res = data[i].On_Datetime.split(":");
                var time1 = res[1] / 15;

                var d = new Date;
                var dM = (d.getMinutes()) / 15;
                var time2 = parseInt(dM) / 15;

                var resdateReceive = data[i].On_Datetime.split(" ");
                var resdateCurrent = data[i].On_Date;




                if ((time1 == parseInt(time2) || (time1 - parseInt(time2)) <= 3) && (resdateReceive[0] == resdateCurrent)) {
                    urlicon = "/img/icon/greeny.png";

                }
                else {
                    urlicon = "/img/icon/gray.png";
                }
                if (data[i].StatusShow == "True") {

                    urlicon = "/img/icon/icon_buttonbBK01.png";
                }
                var icon = {
                    url: urlicon, // url

                    scaledSize: new google.maps.Size(20, 20), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].stationLat, data[i].stationLong),
                    map: map,
                    icon: icon
                });

                google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                    return function () {
                        infowindow.setContent(data[i].content);     // ใส่ Content ใน WindowInfo
                        infowindow.open(map, marker);
                    }
                })(marker, i));

                marker.addListener('mouseout', function () {
                    infowindow.close();
                });




                markers.push(marker);
            }

        },
        error: function (result) {
            //alert('eerr' + result);
        }
    });
}

function myClick(id) {
    google.maps.event.trigger(markers[id], 'mouseover');
}
function EClick(id) {
    google.maps.event.trigger(markers[id], 'mouseout');

}