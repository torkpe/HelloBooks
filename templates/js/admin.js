const all=()=>{
   document.getElementById("d1").style.display="none"
   document.getElementById("d2").style.display="none"
}
let dash1=document.getElementById("dash1")
let dash2=document.getElementById("dash2")

dash1.addEventListener("click", function(e){
    e.preventDefault()
    all()
    document.getElementById("d1").style.display="block"
    //console.log("hello")
})
dash2.addEventListener("click", function(e){
    e.preventDefault()
    all()
    document.getElementById("d2").style.display="block"
})