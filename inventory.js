
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
    if (window.localStorage.getItem("Inventory") !== null){
    var data
    var data = JSON.parse(window.localStorage.getItem("Inventory"))
    if (window.localStorage.getItem("buyitem").length > 0){
         
        var i;
        for (i = 0; i < JSON.parse(window.localStorage.getItem("buyitem")).length; i++) {
         console.log("push to items")
         data.push(JSON.parse(window.localStorage.getItem("buyitem"))[i])
        }
       window.localStorage.setItem("buyitem","")
     }else{console.log(window.localStorage.getItem("buyitem").length)}
    
     if (data.length > 0){
       self.items = data  
        }
    }else{ 
      window.localStorage.setItem("room","original")
      window.localStorage.setItem("Inventory",JSON.stringify(self.items))
    
    }
     return;
    
    }
    
  
