
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
            <span class="helptext hide">
                <p class="center-text">Notes formatting guide</p>
                <table>
                    <tr>
                        <th>Element</th>
                        <th>Markdown Syntax</th>
                    </tr>
                    <tr>
                        <td>Heading</td>
                        <td># My Heading</td>
                    </tr>
                    <tr>
                        <td>Bold</td>
                        <td>**Bold text**</td>
                    </tr>
                    <tr>
                        <td>Italic</td>
                        <td>*Italic text*</td>
                    </tr>
                    <tr>
                        <td>New line</td>
                        <td>Press enter</td>
                    </tr>
                    <tr>
                        <td>New Paragraph</td>
                        <td>Press enter twice</td>
                    </tr>
                    <tr>
                        <td>Unordered List</td>
                        <td>
                            - One <br>
                            - Two <br>
                            - Three
                        </td>
                    </tr>
                    <tr>
                        <td>Ordered List</td>
                        <td>
                            1. One <br>
                            2. Two <br>
                            3. Three
                        </td>
                    </tr>
                    <tr>
                        <td>Horizontal Rule</td>
                        <td>---</td>
                    </tr>
                    <tr>
                        <td>Links</td>
                        <td>https://google.com</td>
                    </tr>
                </table>
            </span>
        </div>        
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const helpBtn = note.querySelector('.help');
    const helpText = note.querySelector('.helptext');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked.parse(text);

    deleteBtn.addEventListener('click', ()=> {
        note.remove();

        updateLS();
    })

    editBtn.addEventListener('click', ()=> {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');

    })

    textArea.addEventListener('input', (e)=>{
        const {value} = e.target
        main.innerHTML = marked.parse(value)

        updateLS();
    })

    helpBtn.addEventListener('click', ()=>{
        if(helpText.classList.contains("hide")){
            helpText.classList.remove("hide");
            helpText.classList.add("show");
        } else{
            helpText.classList.remove("show");
            helpText.classList.add("hide");
        }      
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}

