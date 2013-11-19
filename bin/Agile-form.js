(function(){
  var debug, jade, utils, AgileForm;
  debug = require('debug')('af');
  jade = require('jade');
  utils = require('./utils');
  module.exports = AgileForm = (function(){
    AgileForm.displayName = 'AgileForm';
    var prototype = AgileForm.prototype, constructor = AgileForm;
    function AgileForm(jadeTemplatesDir){
      this.jadeTemplatesDir = jadeTemplatesDir != null ? jadeTemplatesDir : __dirname;
      this.createDefaultField = bind$(this, 'createDefaultField', prototype);
      this.createNumberField = bind$(this, 'createNumberField', prototype);
      this.createField = bind$(this, 'createField', prototype);
      this.closeFieldset = bind$(this, 'closeFieldset', prototype);
      this.openFieldset = bind$(this, 'openFieldset', prototype);
      this.generateForm = bind$(this, 'generateForm', prototype);
    }
    prototype.generateForm = function(obj, done){
      var config, this$ = this;
      this.form = '';
      utils.asyncObjectVisit(config = {
        obj: obj,
        visitValue: this.createField,
        visitObj: {
          before: this.openFieldset,
          after: this.closeFieldset
        },
        done: function(){
          done(this$.form);
        }
      });
    };
    prototype.openFieldset = function(key, value, callback){
      var isTopLevel;
      this.form += (isTopLevel = !key) ? '<form>\n' : '<fieldset>\n';
      callback();
    };
    prototype.closeFieldset = function(key, value, callback){
      var isTopLevel;
      this.form += (isTopLevel = !key) ? '</form>\n' : '</fieldset>\n';
      callback();
    };
    prototype.createField = function(key, value, callback){
      switch (typeof value) {
      case 'number':
        this.createNumberField(key, value, callback);
        break;
      default:
        this.createDefaultField(key, value, callback);
      }
    };
    prototype.createNumberField = function(key, value, done){
      this.form += '<input type=number>\n';
      done();
    };
    prototype.createDefaultField = function(key, value, done){
      var this$ = this;
      jade.renderFile(this.jadeTemplatesDir + "/default-field.jade", {
        key: key
      }, function(err, result){
        if (err) {
          throw err;
        }
        this$.form += result;
        done();
      });
    };
    return AgileForm;
  }());
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
