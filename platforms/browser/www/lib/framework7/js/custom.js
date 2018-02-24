
// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    // cacheIgnore:["http://gis.35utech.com"],
    // cacheIgnoreGetParameters : true,
    material: true,
    cacheDuration: 0,
    cache: false,
    tapHold: true, //enable tap hold events
    onPageInit: function (app, page) {

    }
});

var $$ = Dom7;
var server = "http://gis.35utech.com";
// Add main view
var mainView = myApp.addView('.view-main', {
    domCache: true
});
$$(document).on('submit', '#form-reset-password', function (e) {
    var password   = $$("#password").val(); 
    var repassword = $$("#repassword").val();
    var decodeuser = atob(window.localStorage.getItem('username'));
    if (password != repassword) { myApp.alert('password tidak sama', ['Peringatan']); } 
    else {
        $$.ajax({
            url: server+"/index.php?r=api/postforgotpassword",
            data: {password: password, repassword: repassword, username: decodeuser},
            success:function(data){
                var dataObj  = JSON.parse(data)
                if (dataObj.status) { 
                    myApp.alert(dataObj.message, 'Informasi', function () {
                        window.localStorage.removeItem('username');
                        window.location.assign("http://localhost:3000/main.html");
                    });
                } else {
                    customAlert(dataObj.message, 'Peringatan');
                }
             },
            error:function(err){
                customAlert('Oops terjadi kesalahan', 'Peringatan');
            }
        });
    } 
});
$$(document).on('click', '#check-tracking-3', function (e) {
    var status = $("#check-tracking2-3").prop('checked');
    var ukm_id = window.localStorage.getItem("ukm_id");
    console.log(ukm_id);
    console.log(status);
    // var status = $(".label-switch").hasClass("active-state");
    // console.log(status);
    $$.ajax({
        url: server+"/index.php?r=api/PostSetting",
        data: {
            ukm_id: ukm_id, 
            status: status,
            for_what:"delivery", 
        },
        success:function(data){
            console.log(data);
            // var dataObj  = JSON.parse(data)
            // if (dataObj.status) { 
            //     myApp.alert(dataObj.message, 'Informasi', function () {
            //         window.localStorage.removeItem('username');
            //         window.location.assign("http://localhost:3000/main.html");
            //     });
            // } else {
            //     customAlert(dataObj.message, 'Peringatan');
            // }
         },
        error:function(err){
            // customAlert('Oops terjadi kesalahan', 'Peringatan');
        }
    });
});

$$(document).on('click', '.open-minimum', function (e) {
    var ukm_id = window.localStorage.getItem("ukm_id");
    myApp.prompt( 'Masukan Minumum Pemesanan', [ 'Minimum Pemesanan'],
    function (value) {
      if (value == '') {
        customAlert('Minimum Pemesanan harap diisi', 'Peringatan');
        console.log("kosong");
      } else {
        console.log("terisi");
        console.log(value);
        if (validateNumber(value)) {
            console.log("angka");
            $$.ajax({
                url: server+"/index.php?r=api/PostSetting",
                data: {
                    ukm_id: ukm_id, 
                    value: value,
                    for_what:"minimal", 
                },
                success:function(data){
                    console.log(data);
                 },
                error:function(err){
                    console.log(err);
                }
            });
        } else {
            console.log("bukan angka");
            customAlert('Format harus angka', 'Peringatan');
        }  
      }
    },
    function(value) {
      // myApp.alert('silahkan check email anda', ['']);
    }
  );
});