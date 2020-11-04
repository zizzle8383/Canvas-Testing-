var shopitems = []


function Setup(){
  if (window.localStorage.getItem("buyitem") !== null){
      shopitems = JSON.parse(window.localStorage.getItem("buyitem"))
      console.log(shopitems)
      }else{
        console.log("User Has no items in cart.")
}




function buy(cost,itemid){
  currentinven = JSON.parse(localStorage.getItem("Inventory"))
                            
  console.log(""+cost+","+itemid+"")
 if (currentinven.includes(itemid) == false){
  if (localStorage.getItem("cash") !== null){
    if (localStorage.getItem("cash") >= cost){
      shopitems.push(itemid)
      localStorage.setItem("buyitem",JSON.stringify(shopitems))
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
}
  
