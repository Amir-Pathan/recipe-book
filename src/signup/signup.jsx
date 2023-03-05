import React, { useState,useEffect } from 'react'
import { Container } from '@mui/system'
import { Button, Grid, Paper,TextField,Typography } from '@mui/material'
import field from './fields'
import services from '../services/service'
import { useNavigate } from 'react-router-dom'
import isAuntenticated from '../services/autenticated'


const style={
  box:{
    width:'96%',
    marginLeft:'2%',
    marginTop:'25px',
    marginBottom:'10px'
  }
}

function SignUp(){

  const user = {
    name:'',
    email:'',
    password:'',
    repassword:''
  }

  const errors ={
    nameError:'',
    emailError:'',
    passwordError:'',
    rePassword:''
  }

  const [_user,setUser] = useState(user)

  const [_error,setError] = useState(errors)

  const navigate = useNavigate()

  useEffect(()=>{

    if(isAuntenticated()) navigate('/')

  },[])


  const hanldeChange=(k,e)=>{

    setUser(prev=>({
      ...prev,
      [k]:e
    }))

  }

  const errorHandleChange=(k,e)=>{

    setError(prev=>({
      ...prev,
      [k]:e  
    }))

  }

  const submit=()=>{

    let validDetails=true

    if(_user.name.length<1){
       errorHandleChange('nameError','Name Length 1 or more than 1')

       validDetails=false

    }else{
      errorHandleChange('nameError','') 
    }

    var emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(_user.email.match(emailValid)){

      errorHandleChange('emailError','')


    }else{
      errorHandleChange('emailError','Please Enter valid Email')

      validDetails=false
    }

    if(_user.password.length<6){
     
      errorHandleChange('passwordError','password length minimum 6 charecters')

      validDetails=false
      
    }else{

      errorHandleChange('passwordError','')

    }

    if(_user.password!=_user.repassword){

      errorHandleChange('rePassword','password not match')

      validDetails=false

    }else{
      errorHandleChange('rePassword','') 
    }


    if(validDetails){

       services.signUp(_user.email,_user.password,_user.name).then((res)=>{

        navigate('/')

       }).catch((err)=>{

        err = err.code.replace('auth/','')

        errorHandleChange('emailError',err)

       })


    }

  }

  return(
    <>
       <Container>
        <Paper style={{marginTop:'15px'}}>
          <Grid container item xs={12} md={12} spacing={2} style={style.box}>
            <Grid item xs={12} md={12} >
              <Typography align='center' variant='h5'>SignUp</Typography>
            </Grid>
             {
              field.map((i,index)=>{

                return <Grid item xs={12} md={12} key={index}>
                  <TextField label={i.label} fullWidth size='small'required={i.require}
                  type={i.type}
                  value={_user[i.value]}
                  onChange={(e)=>hanldeChange(i.value,e.target.value)}
                  helperText={_error[i.error]}
                  />

                </Grid>

              })
             }
             <Grid item xs={6} md={6}>
              <Button fullWidth>Cancel</Button>
             </Grid>
             <Grid item xs={6} md={6}>
              <Button fullWidth
              onClick={submit}
              >SignUp</Button>
              </Grid>
          </Grid>
          <Typography variant="h6" textAlign={'center'} sx={{
            color:'grey',
            cursor:'pointer'
          }}
          onClick={()=>{

            navigate('/login')

          }}
          >Already have Account! Login</Typography>
        </Paper>
       </Container>
    </>
  )

}

export default SignUp