inventory = function(){
 var self = {
         items:[]   
     }
     self.additem = function(itemid){
       self.items.push(itemid)
     }
     self.hasitem = function(itemid){
      if (self.items.includes(itemid) = true){
            console.log("removing"+itemid+"")
            self.items.splice(inv.items.indexOf(itemid))
            console.log("Completed.")
        }
     }
}
