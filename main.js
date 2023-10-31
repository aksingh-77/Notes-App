import { renderNotes } from "./app.js";

// Query selector for input elements
let note = document.querySelector(".note");
let title = document.querySelector(".title");
let addNoteButtton = document.querySelector(".add-btn");
// Query selectors for display notes section
let notesDisplay = document.querySelector(".notes-display");
let showOtherNotes = document.querySelector(".notes-container");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if(arrayOfNotes.length >0 ){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
} 




//Event listner for pin, delete, archive from cards
notesDisplay.addEventListener("click", (event)=>{
    let type = event.target.dataset.type;
    let noteId = event.target.dataset.id;
    // console.log(event.target)

    switch(type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id}) => id.toString() !== noteId);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            //here we are passing only those object whose isPinned is true to render under the pinned section 
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isPinned : !note.isPinned}:note);
            //here we are passing only those object whose isPinned is false to render over div using filter method
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            //here we are passing only those object whose isPinned is true to render under the pinned section 
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
            localStorage.setItem("notes",JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            console.log("under archive case")
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived : !note.isArchived}:note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    }
})



//Event listner for the add Note button
addNoteButtton.addEventListener("click", ()=>{
    //console.log(note.value);
    //console.log(title.value);
    if(note.value.trim().length > 0 || title.value.trim().length > 0 ){
        arrayOfNotes = [...arrayOfNotes, {id:Date.now(), title: title.value.trim(), note : note.value.trim(), isPinned: false, isArchived: false}];
        //To empty the input fields
        note.value = title.value = "";
        //To render the array aof notes as html
        //showOtherNotes.innerHTML = renderNotes(arrayOfNotes);

        showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
        //here we are passing only those object whose isPinned is true to render under the pinned section 
        showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => isPinned && !isArchived));
        //Tio store the array into localStorage
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes))
    }

});


showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => isPinned && !isArchived));