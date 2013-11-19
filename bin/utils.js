(function(){
  var debug, async, sugar, _, FIXTURE_PATH, AllDoneWaiter, asyncObjectVisit, _asyncObjectVisit, unpackAllFunctions, loadFixture;
  debug = require('debug')('af');
  async = require('async');
  sugar = require('sugar');
  debug = require('debug')('aw');
  _ = require('underscore');
  FIXTURE_PATH = __dirname + '/../test-bin/';
  AllDoneWaiter = (function(){
    AllDoneWaiter.displayName = 'AllDoneWaiter';
    var prototype = AllDoneWaiter.prototype, constructor = AllDoneWaiter;
    function AllDoneWaiter(done){
      this.done = done;
      this.check = bind$(this, 'check', prototype);
      this.addWaitingFunction = bind$(this, 'addWaitingFunction', prototype);
      this.setDone = bind$(this, 'setDone', prototype);
      this.runningFunctions = 0;
    }
    prototype.setDone = function(done){
      return this.done = done;
    };
    prototype.addWaitingFunction = function(fn){
      var this$ = this;
      this.runningFunctions += 1;
      return function(){
        if (fn) {
          fn.apply(null, arguments);
        }
        this$.runningFunctions -= 1;
        this$.check();
      };
    };
    prototype.check = function(){
      if (this.runningFunctions === 0) {
        this.done();
      }
    };
    return AllDoneWaiter;
  }());
  asyncObjectVisit = function(arg$){
    var obj, visitValue, visitObj, done;
    obj = arg$.obj, visitValue = arg$.visitValue, visitObj = arg$.visitObj, done = arg$.done;
    _asyncObjectVisit(null, obj, visitValue, visitObj, function(){
      done();
    });
  };
  _asyncObjectVisit = function(key, value, visitValue, visitObj, done){
    debug("key: " + key + ", value: " + value);
    if (typeof value !== 'object') {
      visitValue(key, value, done);
    } else {
      visitObj.before(key, value, function(){
        async.eachSeries(Object.keys(value), function(key, callback){
          _asyncObjectVisit(key, value[key], visitValue, visitObj, callback);
        }, function(){
          visitObj.after(key, value, function(){
            done();
          });
        });
      });
    }
  };
  unpackAllFunctions = function(utilObj){};
  loadFixture = function(dataName){
    return eval(require('fs').readFileSync(FIXTURE_PATH + dataName + '.js', {
      encoding: 'utf-8'
    }));
  };
  module.exports = {
    AllDoneWaiter: AllDoneWaiter,
    asyncObjectVisit: asyncObjectVisit,
    loadFixture: loadFixture
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
