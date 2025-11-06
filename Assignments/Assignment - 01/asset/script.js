const board= document.getElementById("board");
const addBtn= document.getElementById("addBtn");
const viewBtn= document.getElementById("viewBtn");
const colorPicker= document.getElementById("colorPicker");
const sizePicker= document.getElementById("sizePicker");

//Add a new note
addBtn.addEventListener("click", () => {
    const note = document.createElement("div");
    note.classList.add("note", sizePicker.value);
    note.style.backgroundColor = colorPicker.value;
    note.textContent= "Click to edit!" ;


const removeBtn = document.createElement("button");
removeBtn.textContent = "X";
removeBtn.addEventListener("click" , (e) => {
    e.stopPropagation();
    note.remove();
});



//Edit text
note.addEventListener("click", () => {
    note.setAttribute("contenteditable", "true");
    note.style.writingMode="horizontal-tb";
    note.focus ();
});

note.addEventListener("blur", () => {
    note.removeAttribute ("contenteditable");
    note.style.writingMode="";
});

note.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        e.preventDefault();
        note.blur();
    }
});

note.appendChild(removeBtn);
board.appendChild(note);
});


//Switch between grid and list new
viewBtn.addEventListener("click", () => {
    board.classList.toggle ("grid-view");
    board.classList.toggle ("list-view");
});
