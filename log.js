export function log(message) {
  console.log(message);
  const li = document.createElement('li');
  li.textContent = message;
  document.getElementById('log').append(li);
}