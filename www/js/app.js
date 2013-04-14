$.when(pgReady, jqmReady).then(function() {

    // variables
    var trackingData = [],
    watchId = null,
    networkStatus = null,

    // events handlers
    checkNetworkStatus = function() {
        console.log("checking network status");
        var newStatus = navigator.network.connection.type;
        if (newStatus == networkStatus) {
            return;
        }

        if (newStatus == Connection.NONE) {
            $("#network-button").text("No Internet Access")
                .buttonMarkup({icon:"delete", theme:"e"})
                .button("refresh");
            console.log("app :: no connection");
        } else {
            $("#network-button").text("Internet Access Enabled")
                .buttonMarkup({icon:"check", theme:"b"})
                .button("refresh");
            console.log("app :: connected");
        }
    };

    // bindings
    


    $("#about").on("pageshow", checkNetworkStatus);
    $(document).on("online", checkNetworkStatus);
    $(document).on("offline", checkNetworkStatus);

});

