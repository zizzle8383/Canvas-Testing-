inventory = function(){
 var inv = {
         items:[]   
     }
     inv.additem = function(itemid){
       inv.items.push(itemid)
     }
     inv.hasitem = function(itemid){
      if (inv.items.includes(itemid) = true){
            console.log("removing"+itemid+"")
            inv.items.splice(inv.items.indexOf(itemid))
            console.log("Completed.")
        }
     }
}
