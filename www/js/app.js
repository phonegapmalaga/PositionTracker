$.when(pgReady, jqmReady).then(function() {

    // variables
    var trackingData = [],
    trackID,
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
    },

    startTrackingPosition = function() {
        console.log("app :: start tracking position tapped");
        watchId = navigator.geolocation.watchPosition(
            function(position) {
                trackingData.push(position);
                console.log(position);
            },
            function(error) {
                console.log(error);
            },
            { frequency: 3000, enableHighAccuray: true}
        );

        trackID = $("#id-name").val();
        console.log("app :: trackId name --> " + trackID);
        $("#tracking-field").hide();
        $("#tracking-status").html(
            "Tracking workout: <strong>" + trackID + "</strong>")
    },
    
    stopTrackingPosition = function() {
        console.log("app :: stop tracking button pressed");
        console.log(trackingData);
        navigator.geolocation.clearWatch(watchId);
        window.localStorage.setItem(trackID, JSON.stringify(trackingData));
        watchId = null;
        trackingData = [];
        $("#id-name").val("");
        $("#tracking-field").show();
        $("#tracking-status").html(
            "Stopped tracking workout: <strong>"  + trackID + "</strong>");
    };
    
    // bindings
    
    $("#about").on("pageshow", checkNetworkStatus);
    $(document).on("online", checkNetworkStatus);
    $(document).on("offline", checkNetworkStatus);

    $("#start-button").on("tap", startTrackingPosition);
    $("#stop-button").on("tap", stopTrackingPosition);
});

