
  var self = {
   items:[]
  }
  
  savedata = function(){
        window.localStorage.setItem("Inventory", JSON.stringify(self.items));
 
    return;
  }
  
   additem =  function(itemid){
     if (Aitems.includes(itemid) === true){
         if (self.items.includes(itemid) === false){
         self.items.push(itemid)
         
         }
       }
     return;
   }
  
  loaddata = function(){
    if (window.localStorage !== null){
    var data
    var data = JSON.parse(window.localStorage.getItem("Inventory"))
     if (data.length > 0){
      self.items = data
     }
    }else{ 
      window.localStorage.setItem("room","original")
      window.localStorage.setItem("Inventory","[]")
    }
     return;
    }
    
  
