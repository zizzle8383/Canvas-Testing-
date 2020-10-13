inventory = function(){
  var self = {
   items:[]
  }
 self.additem = function(itemid){
   if (self.items.includes(itemid) === true){
     if (Aitems.includes(itemid) === true){
   self.items.push(itemid)
   return;
      }
    }
  }
  
  self.savedata = function(){
    if (window.localStorage.getItem("Inventory") === null && self.items.legnth > 0){
    window.localStorage.addItem("Inventory",JSON.stringify(items));
    }else if(window.localStorage.getItem("Inventory") !== null && self.items.legnth > 0){
    window.localStorage.setItem("Inventory",JSON.stringify(items));
    }
    return;
  }
  
  self.loaddata = function(){
    if (window.localStorage.getItem("Inventory") !== null){
   items = JSON.parse(window.localStorage.getItem("Inventory"));
      return true;
    }
   return;
  }
return;
}
