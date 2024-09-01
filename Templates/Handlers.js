// const { json } = require("body-parser");

const baseUrl = 'http://localhost:8543/project'

var blog_img = null


function Register(){

    const form = document.querySelector('form')
    
    form.addEventListener('submit', (e)=>{
        
    e.preventDefault(); // prevent to page refresh

    const inputsData = form.getElementsByTagName('input');
    let formData = {}
    
    for( let i of inputsData ){

        formData[i.name] = i.value
    }
    
    e.preventDefault();

    console.log(formData)
    
    fetch(baseUrl + '/register-user' ,{
        headers:{
            "Content-Type": "application/json",
        },
        method : "POST",
        body :JSON.stringify(formData)
    }).then((res)=> res.json()).then((result)=>{

        alert(result.message)
        window.location.replace('/project/LoginPage')

    }).catch((err)=>{
        alert(err.message)
    })
})
}




function Logout(){

    
    fetch(baseUrl + '/logout-user' ,{

        method : "POST",
        body :JSON.stringify({"function":"Logout"})
    }).then((res)=> res.json()).then((result)=>{
        console.log(result)

        if(result.status =200)
        {
            window.location.replace('/project/LoginPage')
        }

    }).catch((err)=>{
        
        alert(err.message)
    })
}







function SavePost(){

    const form = document.querySelector('form')
    
    form.addEventListener('submit', (e)=>{
        
    e.preventDefault(); // prevent to page refresh

    const inputsData = [...form.getElementsByTagName('input'),...form.getElementsByTagName('textarea')];
    let formData = {}
    
    for( let i of inputsData ){

        formData[i.name] = i.value
    }
    
    e.preventDefault();

    console.log(formData)

    if(blog_img == null)
    {
        alert("Please Select image")
    }
    else
    {

        
        let newData = new FormData();
        newData.append('title', formData.title)
        newData.append('desc', formData.desc)
        newData.append('file', blog_img)

        console.log(newData)
        
        console.log(blog_img)

        fetch(baseUrl + '/save-post' ,{
            // headers:{
            //     "Content-Type": "application/json",
            // },
            method : "POST",
            body : newData
        }).then((res)=> res.json()).then((result)=>{
            
            alert(result.message)
            window.location.replace('/project/PostBlogPage')
            
        }).catch((err)=>{
            alert(err.message)
        })
}
    })
}







function Login(){

    const form = document.querySelector('form')
    
    form.addEventListener('submit', (e)=>{
        
    e.preventDefault(); // prevent to page refresh

    const inputsData = form.getElementsByTagName('input');
    let formData = {}
    
    for( let i of inputsData ){

        formData[i.name] = i.value
    }
    
    e.preventDefault();

    console.log(formData)
    
    fetch(baseUrl + '/login-user' ,{
        headers:{
            "Content-Type": "application/json",
        },
        method : "POST",
        body :JSON.stringify(formData)
    }).then((res)=> res.json()).then((result)=>{

        alert(result.message)
        window.location.replace('/project/HomePage')

    }).catch((err)=>{
        alert(err.message)
    })
})
}


const ImageHandle = ()=>{

    let img_data = document.getElementById('formFile').files

    blog_img = img_data[0]

    let temp_url = URL.createObjectURL(img_data[0])
    document.getElementById('post-img').src = temp_url
    console.log(img_data)
}



const viewBlog = ()=>{
    
}