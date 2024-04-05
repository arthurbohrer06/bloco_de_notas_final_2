/**
 * =================================== Definir os principais objetos =====================================
 */
const addNote = document.querySelector("#add-note");
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.
const excluir = document.querySelector('#trash');//excluir nota
const editar = document.querySelector('#pencil');//editar nota

/**
 * ================================= Eventos =============
 */

addNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
});

btnCloseNote.addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
    document.querySelector('#input-id').value='';
    document.querySelector('#input-title').value='';
    document.querySelector('#input-content').value='';

    listNotes();
})

btnSaveNote.addEventListener("click", (evt)=>{
    evt.preventDefault();

    let data = {
        id: document.querySelector("#input-id").value,
        title:  document.querySelector("#input-title").value,
        content:  document.querySelector("#input-content").value,
        lastTime: new Date().getTime(),
    }
    
    saveNote(data);
})

closeModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalView.style.display = 'none';
    notes.style.display = 'flex';
    addNote.style.display = 'block';
    document.querySelector('#title-note').innerText="";
    document.querySelector('#content-note').innerText="";
});











/**
 * ================================= Função =============
 */

const saveNote = (data) => {
    let notes = loadNotes();

    if(data.id.trim().length < 1){
        data.id = new Date().getTime();
        document.querySelector("#input-id").value = data.id;
        notes.push(data);
    }else{
        notes.forEach((item, i)=>{
            if(item.id == data.id){
                notes[i] = data;
            }
        })
    }

    console.log(data);
    notes = JSON.stringify(notes);

    localStorage.setItem('notes', notes);
}

const listNotes = () => {
    let listNotes = loadNotes();
    notes.innerText = '';
    console.log(notes);
    listNotes.forEach((item) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        
        divCard.addEventListener('click', (evt) => {
            evt.preventDefault();
            showNote(item)
        });

        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        let h1 = document.createElement('h1');
        h1.innerText = item.title;
        divCardBody.appendChild(h1);
        divCard.appendChild(divCardBody);

        let pContent = document.createElement('p');
        pContent.innerText = item.content;
        divCardBody.appendChild(pContent);
        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Ultima edição: "+new Date (item.lastTime).toLocaleDateString("pt-BR");
        divCardBody.appendChild(pLastTime);


        notes.appendChild(divCard);

    })

}


const loadNotes = () => {
    let notes = localStorage.getItem('notes');
    if(!notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }

    return notes;

}

const showNote = (item) =>{
    console.log(notes);
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';

    document.querySelector('#title-note').innerText = item.title;
    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    document.querySelector('#content-note').appendChild (pContent);

    let pLastTime = document.createElement('p');
    pLastTime.innerText = "Ultima Edição: "+new Date(item.lastTime).toLocaleDateString('pt-BR');
    document.querySelector('#content-note').appendChild (pLastTime);

    editar.addEventListener('click', (evt)=> {
        evt.preventDefault();
    
        modal.style.display = 'block';
        modalView.style.display = 'none';
    
        let titlo = document.querySelector("#input-title");
        titlo.value = item.title;
    
        let cont = document.querySelector("#input-content");
        cont.value = item.content;
    
        let id = document.querySelector("#input-id");
        id.value = item.id;
    })

    excluir.addEventListener('click', (evt) =>{
        evt.preventDefault();
    
        notes.display
        
    })
}



listNotes();