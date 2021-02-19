'stric mode'

const hamburger = document.querySelector("header nav .hamburger");
const menu = document.querySelector("header nav .menu");
const log = document.querySelector("#log");
const logTxt = document.querySelector("#logTxt");
const clock = document.querySelector(".wrapper .clock-wrapper h2");
const save = document.querySelector("#save a");
const about = document.querySelector(".about");
const aboutBtn = document.querySelector("#about");

const list = document.querySelector(".list ul");
const logs = [];

setInterval(()=>{
  const date = new Date;
  clock.innerHTML =  date.toLocaleTimeString([],{ hour12: 'true' })
},1000)


// **********************//
// classlist toggle drop //
// ********************* //
hamburger.addEventListener('click',()=>{
  menu.classList.toggle("drop");
})


// remove drop class after clicking menus.
menu.addEventListener('click',()=>{
  menu.classList.remove('drop');
})

log.addEventListener('click',()=>{
   let logStr = `${clock.textContent} - ${logTxt.value}`;
   logs.push(logStr);

  //display -list the logs
   display(logs)
  
})

// show about section
aboutBtn.addEventListener('click',()=>{
  about.classList.add('show');
})

// hide about section when click anywhere
about.addEventListener('click',()=>{
  about.classList.remove('show');
})


// display list and pre-save
const display = (arr)=>{
  // clear list
  list.innerHTML="";

  arr.forEach((el,index) => {
    const newLi = document.createElement("li");
    const newText = document.createTextNode(el);

    const newBtn = document.createElement('button');
    const newBtnText = document.createTextNode("X");
    newBtn.appendChild(newBtnText)
    
    // add fucntion dynamically
    newBtn.addEventListener('click', e => rItem(e,index));

    newLi.appendChild(newText);
    newLi.appendChild(newBtn);

    list.appendChild(newLi);

  })

  // pre-save 
  // parameter
  let data="Note: File name is the date today. 'month_day_year_<unique number to avoid overwrite>'\n"
  logs.forEach( el => data += el + "\n")
  
  const date = new Date;
  const fName = date.toLocaleDateString('en-US')
 
  const type ="text/plain;charset=utf-8"
  saveToFile(data, fName, type);
}


// using Blob object to create a file and create a download url so we can save a file.
const saveToFile = (data, fileName, type)=> {
  // create a blob
  const file = new Blob([data], {type: type});

  // create a download link and attach it to element
  const url = URL.createObjectURL(file)
  save.setAttribute('href',url)
  save.setAttribute('download',fileName)
}


// remove item in the array
const rItem = (e,index)=> {
  logs.splice(index,1)
  display(logs)
}