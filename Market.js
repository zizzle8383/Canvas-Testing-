

function buy(cost,itemid){
  currentinven = JSON.parse(localStorage.getItem("Inventory")
                            
  console.log(""+cost+","+itemid+"")
 if (currentinven.includes(itemid) == false){
  if (localStorage.getItem("cash") !== null){
    if (localStorage.getItem("cash") >= cost){
      localStorage.setItem("buyitem",itemid)
      cash = localStorage.getItem("cash")
      cash -= cost;
      localStorage.setItem("cash",cash)
      console.log("Bought"+itemid+"!")
      
    }else{
      console.log("Not Enough Cash!")
    }
  }else{
    localStorage.setItem("cash",0);
    console.log("Added Cash to LocalStorage.")
  }
 }else{
   console.log("Player already owns item!")
}
  
