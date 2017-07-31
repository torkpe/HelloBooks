const all=()=>{
   document.getElementById("body1").style.display="none"
   document.getElementById("body2").style.display="none"
}
const body1=()=>{
    all()
    document.getElementById("body2").style.display="block"
    document.getElementById("header").innerHTML="Sign Up"
    //console.log("hi there")
}
const body2=()=>{
    all()
    document.getElementById("body1").style.display="block"
    document.getElementById("header").innerHTML="Sign In"
    
}
const b1=document.getElementById("b1")
const b2=document.getElementById("b2")
b1.addEventListener("click", function(){
    body1()
    //console.log("hello")
})
b2.addEventListener("click", function(){
    body2()
})

