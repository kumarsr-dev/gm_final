 const Logout= async ( {props} )=>{
    await localStorage.removeItem('token') 
   // await props.history.push('/')
 }

export default Logout