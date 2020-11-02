

function buy(cost,itemid){
  if (localstorage.getItem("cash") !== null){
    if (localstorage.getItem("cash") >= cost){
      localstorage.setItem("buyitem",itemid)
      console.log("Bought"+itemid+"!")
      
    }else{
      console.log("Not Enough Cash!")
    }
  }else{
    localstorage.setItem("cash",0);
    console.log("Added Cash to LocalStorage.")
  }
  
  
