inventory = function(){
  var self = {
   items:[]
  }
  additem = function(itemid){
   if (self.items.includes(itemid) === true){
     if (Aitems.includes(itemid) === true){
   self.items.push(itemid)
   return;
      }
    }
  }
  
  savedata = function(){
    if (window.localStorage.getItem("Inventory") !== null){
    window.localStorage.addItem("Inventory",JSON.stringify(items));
      return;
    }else{ 
      window.localStorage.setItem("Inventory",JSON.stringify(items));
      return;
    }
    return;
  }
  
  loaddata = function(){
    if (window.localStorage.getItem("Inventory") !== null){
   items = JSON.parse(window.localStorage.getItem("Inventory"));
      return true;
    }
   return;
  }
return;
}
