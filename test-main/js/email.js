const submitBtn = document.querySelector('#submit');

submitBtn.onclick = function name(){
    const inputElement = document.getElementById('from_name');
    const name = inputElement.value;
    localStorage.setItem('name', name);
    const inputElement2 = document.getElementById('email');
    const email = inputElement2.value;
    localStorage.setItem('email', email);
}

submitBtn.addEventListener("click", function() {
    location.href = "test.html";
  });