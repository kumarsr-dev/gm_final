
export default function Fetch(method,path,body,token){
    const x=new Promise((resolve,reject)=>{
        fetch(path,{method:method,headers:token,body:body})
        .then(res=>res.json())
        .then(result=>{if(result.status==200){
                resolve=result.data
        }else{
            reject=result
        }})
        .catch(err=>reject=err)
    })
    return x
}