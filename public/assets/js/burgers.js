// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }
})

async function eat(event, id, name) {
  event.preventDefault()
  var eaten = `<li>${name}</li>`
  document.getElementById(id).remove()
  document.getElementById('devoured').innerHTML += eaten
  await fetch(`/api/burgers/${id}`, {
    method: 'PUT',
  })
}

async function addBurger(event) {
  event.preventDefault()
  var newBurger = document.getElementById('new-burger').value
  if (newBurger !== '') {
    var id = await fetch(`/api/add/${newBurger}`, { method: `POST` }).then(r => r.json())
    console.log(id)
    var newLI = `<li id='${id.id}'>${newBurger} <button class="eat-button" data-id='${id.id}' data-newdevoured="0" onclick="eat(event, '${id.id}', '${newBurger}')">
		Eat
	</button> </li>` 
    document.getElementById('not-devoured').innerHTML += newLI
  }

}