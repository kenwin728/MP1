const submitBtn = document.querySelector("#Login");
const userForm = document.forms.loginUserForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    console.log('submit');
    const myObj = { 
        username: formData.get("username"),
        password: formData.get("password")
    };
    console.log(myObj);
    const jString = JSON.stringify(myObj);
    console.log(jString);

    try {
        const response = await fetch("/login", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const url = await response.text();
        const path = JSON.parse(url);
        location.href = path;
        console.log(response);
    } catch (err) {
        console.error(err);
    }
});