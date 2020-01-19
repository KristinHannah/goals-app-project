
const app = new App()

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded")
  let url = "http://localhost:3000/api/v1/goals/index"
  fetch(url)
    .then(resp => resp.json())
    .then(data => data.forEach(goal => {
      displayRow(goal)
    }))
})

function displayRow(row) {
  const table = document.querySelector("#goal-table")
  table.innerHTML +=
    `
  <tr>
    <td>${goal.name}</td>
    <td>${goal.category}</td>
    <td>${goal.user_id}</td>
  </tr>
  `
}