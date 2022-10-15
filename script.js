
const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', ()=> addNewNote())

function addNewNote(text = ''){
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML= `
    
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
        <div class= "helpdiv">
            <button class="help"><i class="fa-solid fa-question"></i></button>
        </div>        
    </div>
    
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    
    
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const helpBtn = note.querySelector('.help');
    // const helpText = note.querySelector('.helptext');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    
    const helpText = document.querySelector('.helptext');
        
    textArea.value = text;
    main.innerHTML = marked.parse(text);

    
// DELETE
    deleteBtn.addEventListener('click', ()=> {
        note.remove();

        updateLS();
    })

    // OPEN EDIT BOX
    editBtn.addEventListener('click', ()=> {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        
    })

    // Get text area input, set pasred text to main div, set any links to open in new tab, update local storage
    textArea.addEventListener('input', (e)=>{
        const {value} = e.target
        main.innerHTML = marked.parse(value)
        let links = main.querySelectorAll("a");

        links.forEach((link)=> {
            link.target = '_blank'
            console.log(link);
        })
        updateLS();
    })

    // Open help dialogue box.
    helpBtn.addEventListener('click', (e)=>{
         
        let rect = helpBtn.getBoundingClientRect();
        let adjustedLeftPos = rect.right +20
        let adjustedTopPos = rect.top;
        helpText.style.left = `${e.clientX +40 +window.scrollX }px`;
        helpText.style.top = `${e.clientY +window.scrollY}px`;
        // console.log(helpText.offsetLeft);
        console.log(rect.right);
        console.log(rect.top);

        if(helpText.classList.contains("hide")){

            helpText.classList.remove("hide");
            helpText.classList.add("show");
            
        } else{
            helpText.classList.remove("show");
            helpText.classList.add("hide");
        }      
    })

    //DRAG AND DROP
helpText.ondragstart = function(){
    return false;
}
helpText.onmousedown = function(event){
    let shiftX = event.clientX - helpText.getBoundingClientRect().left;
    let shiftY = event.clientY - helpText.getBoundingClientRect().top;
    document.body.append(helpText);
    
    function moveAt(pageX, pageY){
        helpText.style.left = pageX - shiftX  + 'px';
        helpText.style.top = pageY - shiftY  + 'px';
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(event){
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    helpText.onmouseup = function(){
        document.removeEventListener('mousemove', onMouseMove);
        helpText.onmouseup = null;
    }
}

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}



