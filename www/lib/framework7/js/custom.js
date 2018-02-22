
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
    if (password != repassword) {
        myApp.alert('password tidak sama', ['Peringatan']);
    } else {
        $$.ajax({
            url: server+"/index.php?r=gis/postforgotpassword",
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
                console.log(err);
            }
        });
    } 
});