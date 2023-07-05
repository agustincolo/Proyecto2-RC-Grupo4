const container = document.querySelector(".container");
let result = ''

const modaltableFilms = new bootstrap.Modal(document.getElementById('modaltableFilms'))
const formFilms = document.querySelector('form')
const name_id = document.getElementById("name_id")
const category = document.getElementById("category_id")
const description = document.getElementById("description_id")
const published =  document.getElementById("published_id")
let option = ''

btnCrear.addEventListener('click', () => {
  description.value = ""
  category.value = ""
  published.value = ""
  name_id.value = ""
  modaltableFilms.show()
  option = 'create'
})