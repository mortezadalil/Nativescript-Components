require('globals'); // necessary to bootstrap tns modules on the new thread
var i = 0;
onmessage = function (obj) {
var self=this;
    setInterval(function () {

        i = i + 1;
        console.log(obj.data.param1 + " another thread " + i);
        if(i==15) self.postMessage(i);
    }, obj.data.param2)

}
