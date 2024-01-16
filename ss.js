let  addbtn = document.querySelector(".add-btn");
let  removebtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolboxcolors = document.querySelectorAll(".color");



let colors = ["lightpink", "lightblue", "lightgreen" , "black"];
let modalPriorityColor = colors[colors.length-1];

let addFlag = false;
let removeFlag = false;
let lockClass = "fa-lock";
let unlockClass =  "fa-lock-open";

let ticketsarr = [];


for (let i = 0; i < toolboxcolors.length; i++) {
    toolboxcolors[i].addEventListener("click" , (e) =>{
        let currenttoolboxcolor = toolboxcolors[i].classList[0];

        let filtreredTickets  =  ticketsarr.filter((ticketObj , idx) => {
             return currenttoolboxcolor === ticketObj.ticketColor;
        })

        let  allticketcont = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allticketcont.length; i++) {
          allticketcont[i].remove();
            
        }

        filtreredTickets.forEach((ticketObj , idx) =>{
              creatt(ticketObj.ticketColor , ticketObj.ticketTask , ticketObj.ticketID);
        })
        
    
    
    
    }) 
    
}




allPriorityColors.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        allPriorityColors.forEach((priorityColorsElem, idx) => { 
            priorityColorsElem.classList.remove("border");
        })
        colorElem.classList.add("border");


         modalPriorityColor  = colorElem.classList[0];
    })
})









addbtn.addEventListener("click", (e) => {
 
                   
                  addFlag = !addFlag;
                  if(addFlag) {
                        modalCont.style.display = "flex";
                  }
             else{
                    modalCont.style.display = "none";
             }
           })



removebtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})

           modalCont.addEventListener("keydown", (e) => {

            
            let key = e.key ;
            if(key === "Shift"){
                creatt(modalPriorityColor , textareaCont.value);
                modalCont.style.display = "none";
                addFlag = false;
                textareaCont.value = "";
            }

           })

           function creatt( ticketColor , ticketTask, ticketID) {
               let id = ticketID || shortid();
               let ticketCont = document.createElement("div");
               ticketCont.setAttribute("class", "ticket-cont");
               ticketCont.innerHTML = `
               <div class="ticket-color ${ticketColor}"></div>
               <div class="ticket-id">#${id}</div>
               <div class="task-area">${ticketTask}</div>
               <div class="ticket-lock">
        <i class="fas fa-lock"></i>
    </div>
    `;               


                         
mainCont.appendChild(ticketCont);



 if(!ticketID)  ticketsarr.push({ticketColor , ticketTask , ticketID : id });
console.log(ticketsarr)
                
                        handleRemoval(ticketCont);
                        handleLock(ticketCont);
                        handleColor(ticketCont);
            }
function handleRemoval(ticket) {
if (removeFlag) ticket.remove();
 
}


function handleLock (ticket){
let ticketLockElem = ticket.querySelector(".ticket-lock")
let ticketLock = ticketLockElem.children[0];
let ticketTaskArea = ticket.querySelector(".task-area")
ticketLock.addEventListener("click" , (e) =>{

if(ticketLock.classList.contains(lockClass)) {
    ticketLock.classList.remove(lockClass);
   ticketLock.classList.add(unlockClass);
   ticketTaskArea.setAttribute("contenteditable" , "true");


}
else{
    ticketLock.classList.remove(unlockClass);
    ticketLock.classList.add(lockClass);
   ticketTaskArea.setAttribute("contenteditable" , "false");


}

})
}

function handleColor (ticket){
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click" , (e) =>{
        let currentTicketColor = ticketColor.classList[1];
        let cuurentTicketColorIdx = colors.findIndex((color) =>{
            return currentTicketColor === color;
        })
     console.log(currentTicketColor , cuurentTicketColorIdx);
     cuurentTicketColorIdx++;
     let newticketColorIdx = cuurentTicketColorIdx % colors.length;
     let newticketColor = colors[newticketColorIdx];
     ticketColor.classList.remove(currentTicketColor);
     ticketColor.classList.add(newticketColor)
        
    })
}

