inventory = function(){
  var self = {
   items:[]
  }
  
  savedata = function(){
    if (self.items.length > 0){
      if (window.localStorage.getItem("Inventory") === null){
        window.localStorage.addItem("Inventory",JSON.stringify(self.items));
     }else{window.localStorage.setItem("Inventory",JSON.stringify(self.items));}
    }
    return;
  }
  
   additem =  function(itemid){
     if (Aitems.includes(itemid) = true){
         if (self.items.includes(itemid) = false){
         self.items.push(itemid)
         
         }
       }
     return;
   }
  
  loaddata = function(){
    var data
    var data = JSON.parse(window.localStorage.getItem("Inventory"))
    if (data.length > 0){
      self.items = data
      }
  
    }
    return;
  }
