let alreadyDid = false
let Editing = {
    status: false,
    index: null
}
//*Making the remove and edit button
// let R_E_DIV = document.createElement('div')
// R_E_DIV.innerHTML = "<i class='bx bx-pencil'></i> <i class='bx bx-x' ></i>"
// R_E_DIV.className = "R_E_DIV"


//*
document.querySelector('.Add button').addEventListener('click', ()=>{
    document.querySelector('.Add textarea').classList.add('AddingClass')
    if(alreadyDid){
        let theText = document.querySelector('.Add textarea').value
        if(theText == '') return alert('Please make a proper note!')
        // console.log([theText, Date.now()])
        // return
        let one = JSON.parse(localStorage.newNotes)
        if(Editing.status){
            one[Editing.index][0] = theText
            // console.log(one[Editing.index])
        }else{
            one.push([theText, Date.now()])
        }
        // console.log(one)
        // return
        localStorage.newNotes = JSON.stringify(one)
        document.querySelector('.Add textarea').classList.remove('AddingClass')
        setTimeout(()=>{location.reload()}, 200)     
    }
    if(!alreadyDid) alreadyDid = true

})


let Notes = JSON.parse(localStorage.newNotes)
let i = 0
for(let note of Notes){
    let div = document.createElement('div')
    div.setAttribute('count', i)
    let p = document.createElement('p')
    let span = document.createElement('span')
    p.textContent = note[0]
    span.textContent = (new Date(note[1])).toString().substring(0, 15)
    p.innerHTML = p.textContent.replace(/#(.{2,}?)#/gi, "<code>$1</code>") 
    div.appendChild(p)
    div.appendChild(span)
    div.className = "Note"
    document.querySelector('.Notes').insertBefore(div, document.querySelector('.Add'))

    //*Adding the EDITING DIV
    let R_E_DIV = document.createElement('div')
    R_E_DIV.innerHTML = `<i class='bx bx-pencil' theColor = "#22c522"></i> <i class='bx bx-x' theColor='red'></i>`
    R_E_DIV.className = "R_E_DIV"
    div.appendChild(R_E_DIV)
    R_E_DIV.firstChild.addEventListener('click', ()=>{
        Editing.status = true
        alreadyDid = true
        Editing.index = parseInt(R_E_DIV.firstChild.parentElement.parentElement.getAttribute('count'))
        document.querySelector('.Add textarea').classList.add('AddingClass')
        document.querySelector('#AddContent').value = note[0]
        let textBox = document.querySelector('#AddContent').getBoundingClientRect()
        setTimeout(()=>{
            window.scroll(textBox.x, textBox.y)
        }, 300)
    })
    R_E_DIV.lastChild.addEventListener('click', ()=>{
        let index = parseInt(R_E_DIV.firstChild.parentElement.parentElement.getAttribute('count'))
        let oldNotes = JSON.parse(localStorage.newNotes)
        let newNotes = oldNotes.slice(0, index).concat(oldNotes.slice(index+1))
        let deletedNotes = JSON.parse(localStorage.deletedNotes)
        deletedNotes.push(oldNotes.slice(index, index+1))
        localStorage.deletedNotes = JSON.stringify(deletedNotes)
        localStorage.newNotes = JSON.stringify(newNotes)
        location.reload()
    })
    //*

    i++
}


//? TO Use later <i class='bx bx-pencil'></i>
//? TO Use later <i class='bx bx-x' ></i>
