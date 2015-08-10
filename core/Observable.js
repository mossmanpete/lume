define(function(require, exports, module) {
    var Stream = require('famous/streams/Stream');
    var nextTickQueue = require('famous/core/queues/nextTickQueue');
    var dirtyQueue = require('famous/core/queues/dirtyQueue');

    function Observable(value){
        Stream.call(this);
        this.value = value;

        if (value !== undefined) this.set(value);
    }

    Observable.prototype = Object.create(Stream.prototype);
    Observable.prototype.constructor = Observable;

    Observable.prototype.get = function(){
        return this.value;
    };

    Observable.prototype.set = function(value){
        nextTickQueue.push(function(){
            this.value = value;
            this.emit('start', value);

            dirtyQueue.push(function(){
                this.emit('end', value);
            }.bind(this));
        }.bind(this))
    };

    module.exports = Observable;
});