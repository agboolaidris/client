import axios  from 'axios'
import {CHECK_LOGIN, LOGIN} from './type'

export const CheckLogin =()=>{
  return async(dispatch)=>{
let token =  localStorage.getItem('token')

if(token === null){
    localStorage.setItem('token',"")
   token = ""
  }

   const tokenRes = await axios.post('http://localhost:5000/user/tokenIsValid',null,{headers:{'token':token}})
   if(tokenRes.data){
      axios.get('http://localhost:5000/user',{headers:{'token':token}})
       .then(res=>{
         console.log(res)
        dispatch({type:CHECK_LOGIN, payload:res.data, token:token})
       }
       )
       .catch(err=>{
         console.log(err)

       })
      
    }
}
}

export const SignUp = (user)=>{
  
    return async(dispatch)=>{
    await axios.post('http://localhost:5000/user/register', user)
     .then(async(res)=>{
     await axios.post('http://localhost:5000/user/login', user)
      .then(res=>{
       localStorage.setItem('token', res.data.token)
       dispatch({type:LOGIN, payload:res.data.user})
      })
      .catch(err=>{
        console.log(err)
      })
     })
     .catch((err)=>{
       console.log(err)
     })
    }
}

export const login = (user)=>{
  return async dispatch=>{
       await axios.post('http://localhost:5000/user/login', user)
       .then(res=>{
         console.log(res.data.user)
         localStorage.setItem('token',res.data.token)
         dispatch({type:LOGIN, payload:res.data.user, token:res.date.token})
       })
       .catch(err=>{
         console.log(err)
       })
  }
}

