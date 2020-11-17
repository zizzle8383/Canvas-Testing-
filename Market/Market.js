var shopitems = []


function Setup(){
  if (window.localStorage.getItem("buyitem") !== null){
      shopitems = JSON.parse(window.localStorage.getItem("buyitem"))
      console.log(shopitems)
      }else{
        console.log("User Has no items in cart.")
      }
}




function buy(itemid,cost){
  
 currentinven = JSON.parse(localStorage.getItem("Inventory"))
 var cfirm = confirm("Are you sure you want to buy item "+itemid+"?")
 console.log(""+cost+","+itemid+"")
 if (cfirm == true){
  if (currentinven.includes(itemid) == false){
   if (localStorage.getItem("cash") !== null){
     if (localStorage.getItem("cash") >= cost){
       shopitems.push(itemid)
       localStorage.setItem("buyitem",JSON.stringify(shopitems))
       cash = localStorage.getItem("cash")
       cash -= cost;
       localStorage.setItem("cash",cash)
       console.log("Bought"+itemid+"!")
       alert("Item Purchased!")
     }else{
       console.log("Not Enough Cash!")
       alert("You dont have enough cash!")
     }
   }else{
     localStorage.setItem("cash",0);
     console.log("Added Cash to LocalStorage.")
     alert("You dont have enough cash!")
   }
  }else{
    console.log("Player already owns item!")
    alert("You already own this item!")
  }
 }
}
  
