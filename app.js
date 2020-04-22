let addBtn = document.querySelector('#addBtn')
let text = document.querySelector('#body')
let fileInput = document.querySelector('#file')

//globas
let url

//listeners
fileInput.onchange = e => {
    let file = e.target.files[0]
    firebase.storage().ref("todo").child(file.name).put(file)
        .then(snap => {
            return snap.ref.getDownloadURL() //aqui tenemos la url 
        })
        .then(link => {
            url = link//aqui asignamos la url
            let img = document.createElement('img')
            img.src = link
            document.body.appendChild(img)
        })
}


addBtn.onclick = event => {
    // traer el texto
    let post = {
        body: text.value,
        user: "Yaki",
        date: new Date(),
        img:url,
        
    }
    // QUE PEDO CON LAS PROMESAS [ASINCRONO] let  =

    addNewPost(post)
        // ESto es asíncrono
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log("todo valió baby: ", err)
        })
}

let db = firebase.firestore() // YOLO
let postsRef = db.collection('post')

function addNewPost(post = { user: "yaki", body: "estamos testeando", date: Date.now() }) {
    return postsRef.add(post) // <----- Esto essss una PROMESA
}
