import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { Paper,Grid,TextField,Typography, Button } from '@mui/material'
import services from '../services/service'
import { useNavigate } from 'react-router-dom'
import isAuntenticated from '../services/autenticated'

const field =[
  {
    label:'email',
    value:'email',
    type:'email',
    require:true,
    error:'emailErr'
  },
  {
    label:'password',
    value:'password',
    type:'password',
    require:true,
    error:'passwordErr'
  },
]

function Login(){


  const navigate = useNavigate()

  const user ={
    email:'',
    password:''
  }

  const [_user,setUser] = useState(user)

  const errors ={
    emailErr:'',
    passwordErr:""
  }

  const [error,setError] = useState(errors)

  const handleChange=(k,e)=>{

    setUser(prev=>({
      ...prev,
      [k]:e
    }))
  }

  const errorHandler=(k,e)=>{

    setError(prev=>({
      ...prev,
      [k]:e
    }))

  }

  useEffect(()=>{

    if(isAuntenticated()) navigate('/')

  },[])

  const submit=()=>{

    let validDetails=true

    if(_user.password.length<6){
     
      errorHandler('passwordErr','password length minimum 6 charecters')

      validDetails=false
      
    }else{

      errorHandler('passwordErr','')

    }

    var emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(_user.email.match(emailValid)){

      errorHandler('emailErr','')


    }else{
      errorHandler('emailErr','Please Enter valid Email')

      validDetails=false
    }

    if(validDetails){

      services.login(_user.email,_user.password).then((res)=>{

        navigate('/')

      }).catch((err)=>{

        err = err.code.replace('auth/','')

        setError({
          emailErr:err,
          passwordErr:err
        })

  
      })

    }

  }

  return(
    <>
      <Container>
        <Paper>
          <Grid item xs={12} md={12}>
            <Typography align="center" variant="h5">Login</Typography>
          </Grid>
          {
             field.map((i,index)=>{

              return <Grid item xs={12} md={12} style={{
                marginTop:'10px',
                width:'96%',
                marginLeft:'2%',
                marginBottom:'10px'
              }} key={index}>
                <TextField value={i[_user.email]} size="small" type={i.type}
                label={i.label}
                fullWidth
                required={i.require}
                onChange={(e)=>handleChange(i.value,e.target.value)}
                helperText={error[i.error]}
                />
              </Grid>

             })
          }
          <Grid container item xs={12} md={12} spacing={2}>
          <Grid item xs={6} md={6} >
            <Button fullWidth>Cancel</Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button fullWidth
            onClick={submit}
            >Login</Button>
          </Grid>
          </Grid>
          <Typography color={'grey'} textAlign='center' 
          style={{
            cursor:'pointer'
          }}

          onClick={()=>{

            navigate('/signup')

          }}

          >Not Have Account ! create</Typography>
        </Paper>
      </Container>
    </>
  )

}

export default Login