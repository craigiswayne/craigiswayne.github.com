var Nexus  = {};


Nexus.ajax =  function (param){

  if(arguments.length == 1 && typeof arguments[0] == "string"){
    var tmp_url = arguments[0];
    param = {};
    param.url = tmp_url;
  }

  param = (typeof param == "object") 	? param : {};

  param.target 	= param.target 		|| undefined;
  param.target 	= (typeof param.target == "string") ? document.querySelector(param.target) : param.target;

  param.url		= param.url 		    || undefined;
  param.source	= param.source 		|| (event ? (event.target || event.srcElement) : param.source) || null;
  param.method	= param.method 		|| "GET";

  //check that all required parameters are present
  if(!param.url){
    console.error("Missing parameters");
    return null;
  }

  param.success 	= param.success || function(result){

    if(param.target){
      param.target.remove_class("ajax_loading");

      //append or replace here
      if(param.append === true){
        $(param.target).append('<div class="ajax_result">'+result+'</div>');
      }else{
        $(param.target).html(result);
      }

      return result;
    }
  };

  if(param.target){
    param.target.add_class("ajax_loading");
  }

  $.ajax(param);
};

HTMLElement.prototype.toggle_class = function(class_name1, class_name2){

  if(this.className.indexOf(class_name1) >= 0){
    var existing_classes = this.className.split(" ");
    for(var i=0; i<existing_classes.length; i++){
      existing_classes[i] = existing_classes[i].trim();
      if(existing_classes[i] == class_name1){
        existing_classes[i] = class_name2;
      }
    }
    this.className = existing_classes.join(" ");
  }
  else{
    this.add_class(class_name1);
  }
};

HTMLElement.prototype.remove_class = function(class_name){
  var existing_classes = this.className.split(" ");
  for(var i=0; i<existing_classes.length; i++){
    existing_classes[i] = existing_classes[i].trim();
    if(existing_classes[i] == class_name){
      existing_classes[i] = null;
    }
  }
  this.className = existing_classes.join(" ");
};

HTMLElement.prototype.add_class = function(class_name){
  var existing_classes = this.className.split(" ");
  existing_classes.push(class_name);
  for(var i=0; i<existing_classes.length; i++){
    existing_classes[i] = existing_classes[i].trim();
  }
  this.className = existing_classes.join(" ");
};



HTMLFormElement.prototype.validate = function(){

  var required_elements = this.querySelectorAll("[required]");
  for(var i=0; i<required_elements.length; i++){
    if(required_elements[i].value.trim() == ""){
      required_elements[i].value = "";
      required_elements[i].focus();
      return false;
    }
  }

  return true;
};


HTMLFormElement.prototype.submit_via_ajax = function(){

  if(this.validate() != true){
    alert("Errors were found, please rectify and try again.");
  }
  else{
    var form = this;
    var result = Nexus.ajax({
      url: 	  form.action,
      data: 	$(form).serialize(),
      method: form.method,
      target:	form
    });
  }

};
