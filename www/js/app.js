function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    console.log("app :: document loaded handler");
}

function onDeviceReady() {
    navigator.notification.alert("phonegap is ready!");
    console.log("app :: deviceready handler");
}
