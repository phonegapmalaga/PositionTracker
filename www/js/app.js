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
    },

    clearLocalData = function() {
        window.localStorage.clear();
    },

    loadSampleData = function() {
        window.localStorage.setItem('Walking around Malaga', '[{"coords":{"latitude":36.71701963170518,"longitude":-4.428456299069059,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973452400},{"coords":{"latitude":36.71700243127462,"longitude":-4.427855484249726,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973462405},{"coords":{"latitude":36.71701963170518,"longitude":-4.4271902964140395,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973472411},{"coords":{"latitude":36.7169852308402,"longitude":-4.426482193234092,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973482417},{"coords":{"latitude":36.71715723501326,"longitude":-4.425495140316652,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973492423},{"coords":{"latitude":36.71727763770514,"longitude":-4.425130359890636,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973502429},{"coords":{"latitude":36.71757004345777,"longitude":-4.423778526547089,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973512434},{"coords":{"latitude":36.71684762722407,"longitude":-4.4233922884489845,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973522440},{"coords":{"latitude":36.716400413769904,"longitude":-4.423220627072018,"altitude":100,"accuracy":150,"altitudeAccuracy":80,"heading":134,"speed":7},"timestamp":1365973532446}]')
    },
    
    updateTrackList = function() {
        tracksNumber = window.localStorage.length;
        $("#number-of-tracks").html("<strong>" + 
                tracksNumber +"</strong> workouts(s) recorded");
        $("#history-list").empty();
        for (i=0; i<tracksNumber;i++) {
            $("#history-list")
                .append("<li><a href='#info' data-ajax='false'>" 
                        + window.localStorage.key(i) + "</a></li>")
        }
        $("#history-list").listview("refresh");
    };

    // bindings
    
    $("#about").on("pageshow", checkNetworkStatus);
    $("#history").on("pageshow", updateTrackList);
    $(document).on("online", checkNetworkStatus);
    $(document).on("offline", checkNetworkStatus);

    $("#start-button").on("tap", startTrackingPosition);
    $("#stop-button").on("tap", stopTrackingPosition);
    $("#clear-button").on("tap", clearLocalData);
    $("#load-data-button").on("tap", loadSampleData);
});

