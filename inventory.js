inventory = function(){
  var self = {
   items:[]
  }
  additem = function(itemid){
   if (self.items.includes(itemid) = true){
   self.items.push(itemid)
   return;
    }
  }
  savedata = function(){
    window.localStorage.addItem("Inventory",JSON.stringify(items));
    return;
  }
  loaddata = function(){
   items = JSON.parse(window.localStorage.getItem("Inventory")
   return;
  }
return;
}
