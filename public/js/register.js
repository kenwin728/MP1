const submitBtn = document.querySelector("#Register");
const userForm = document.forms.createUserForm;

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
        const response = await fetch("/register", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        location.href="/login";
        console.log(response);
    } catch (err) {
        console.error(err);
    }
});