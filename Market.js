var cost;
var id;
var num
function buy(ButtonClicked){
 console.log(ButtonClicked.Parent)
 parnt = ButtonClicked.ParentNode
 id = parnt.querySelector("#id").value
 cost = parnt.querySelector("#cost").value;
 console.log(id)
 console.log(cost)

}
