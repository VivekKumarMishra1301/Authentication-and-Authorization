const loginEmail=document.getElementById("emailid");
const loginPassword=document.getElementById("psd");
const login=document.getElementById("sub");
// const presentUser=document.getElementById("user-name");
login.addEventListener("click", function(){
    event.preventDefault();
    const email=loginEmail.value;
    const password=loginPassword.value;

    // presentUser.innerText="";
    if(!email){
        alert('Please Enter Email');
    }
    if(!password){
        alert('Please Enter Password');
    }
    const userDetail={email,password};
    console.log(userDetail);
    fetch("/login-user",{
        method:"POST",
        headers:{//headers are used with http to tell which type of data you are sending to process it reduces the computation of variety of types of files because you can send any form of data to the server
            "Content-Type": "application/json"
        },
        body:JSON.stringify(userDetail),
    }).then(function(response){
        if(response.status === 200){
            // alert("Registerd Successfully Go to Login Page");
            // presentUser.innerText=response.user;
            window.location.href="/home";
        }else if(response.status===401){
            alert("email or password is invalid");
            window.location.href="/login";
        }else{
            alert("Something Went wrong");
        }

    });
});