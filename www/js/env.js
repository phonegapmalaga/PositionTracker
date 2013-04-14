var pgReady = $.Deferred();
var jqmReady = $.Deferred();

$(document).on("mobileinit", function(){
    console.log("app :: jquery mobile ready");
    jqmReady.resolve();
});

$(document).on("deviceready", function() {
    console.log("app :: device ready");
    pgReady.resolve();
});
