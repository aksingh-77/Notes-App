export const renderNotes = (notes) =>{
    let newNote = notes.map(({id, note, title, isPinned, isArchived}) => {
        return(
            `<div class="single-note relative shadow">
                <!--Section for title and delete button-->
                <div class="d-flex align-center title-container">
                    <span class="single-note-title">${title}</span>
                    <!--Even though the id property was a number it will be converted to string when passed to data attribute-->
                    <button class="button del-btn v-hidden" data-type="del" data-id=${id}>
                        <span data-type="del" data-id=${id} class="material-icons-outlined">delete</span>
                    </button>
                </div>

                <!--Section for notes-->
                <p>${note}</p>

                <!--Section for pinned and archive -->
                <div class="options d-flex gap-md">
                    <button class="button btn pinned-btn v-hidden" data-type="pinned" data-id=${id}>
                        <span class=${isPinned ? "material-icons" : "material-icons-outlined"} data-type="pinned" data-id=${id}>push_pin</span>
                    </button>

                    <button class="button btn pinned-btn v-hidden" data-type="archive" data-id=${id}>
                        <span class="material-icons-outlined" data-type="archive" data-id=${id}>archive</span>
                    </button>
                </div>
            </div>`
        )
    });

    //As the newNote created was like a arrray it was showing an comma between 2 cards
    //So we converted it as a String to remove the comma 
    newNote = newNote.join("");
    return newNote;
}