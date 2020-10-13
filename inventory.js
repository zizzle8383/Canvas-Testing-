inventory = function(){
  var self = {
   items:[];
  }
  additem = function(itemid){
   if (self.items.includes(itemid) !== false){
   self.items.push(itemid)
    }
  }
}
