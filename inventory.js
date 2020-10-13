inventory = function(){
  var self = {
   items:[]
  }
  
  savedata = function(){
    if (items.length > 0){
      if (window.localStorage.getItem("Inventory") === null){
        window.localStorage.addItem("Inventory",JSON.stringify(items));
     }else{window.localStorage.setItem("Inventory",JSON.stringify(items));}
    }
    return;
  }
  
   additem =  function(itemid){
     if (Aitems.includes(itemid) = true){
         if (items.includes(itemid) = false){
         items.push(itemid)
         
         }
       }
     return;
   }
  
  loaddata = function(){
    var data
    var data = JSON.parse(window.localStorage.getItem("Inventory"))
    if (data.length > 0){
      items = data
      }
  
    }
    return;
  }
