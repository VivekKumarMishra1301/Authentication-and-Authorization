const submitBut=document.getElementById("sbm");
const em=document.getElementById("email");
const psd=document.getElementById("password");
const user=document.getElementById("user");
const cnf=document.getElementById("confirm-password");

submitBut.addEventListener("click",function(){
    event.preventDefault(); 
    
    const email=em.value;
    const password=psd.value;
    const name=user.value;
    const c=cnf.value;
    if(!email){
        alert('Please Enter Email');
        window.location.href="/signup";
        return;
    }
    if(!password){
        alert('Please Enter Password');
        window.location.href="/signup";
        return;
    }
    if(c!=password){
        alert("Password doesn't match! Please Enter Password");
        window.location.href="/signup";
        return;
    }
    
   
    const userDetail={email,password,name};


    fetch("/signup",{
        method:"POST",
        headers:{//headers are used with http to tell which type of data you are sending to process it reduces the computation of variety of types of files because you can send any form of data to the server
            "Content-Type": "application/json"
        },
        body:JSON.stringify(userDetail),
    }).then(function(response){
        if(response.status === 200){
            alert("Registerd Successfully Go to Login Page");
            window.location.href="/login";
        }else if(response.status===401){
            alert("Email already exist");
            window.location.href="/signup";
        }else{
            alert("Something Went wrong");
        }

    });
});

