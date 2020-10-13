inventory = function(){
  var self = {
   items:[]
  }
  
  self.savedata = function(){
    if (items.length > 0){
      if (window.localStorage.getItem("Inventory") === null){
        window.localStorage.addItem("Inventory",JSON.stringify(items));
     }else{window.localStorage.setItem("Inventory",JSON.stringify(items));}
    }
    return;
  }
  
   self.additem =  function(itemid){
     if (Aitems.includes(itemid) = true){
         if (items.includes(itemid) = false){
         items.push(itemid)
         
         }
       }
     return;
   }
  
  self.loaddata = function(){
    var data
    var data = JSON.parse(window.localStorage.getItem("Inventory"))
    if (data.length > 0){
      items = data
      }
  
    }
    return;
  }
