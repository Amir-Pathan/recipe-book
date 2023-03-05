import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { Paper,Typography } from '@mui/material'
import services from '../services/service'
import ReciepeCard from '../lib/card/card'
import Grid from '@mui/material/Grid'

const Profile=()=>{

  let [user,setUser]= useState({})

  const [reciepies,setReciepies] = useState([])

  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    let u = localStorage.getItem('user')

    u = JSON.parse(u)

    setUser(u)

    services.getData('recipies',u.id).then((res)=>{

      console.log(res);

      setReciepies(res)

      setLoading(false)

    }).catch((err)=>{

      console.log(err);

    })

  },[])

  return(
    <>
    <Container>
      <Paper>
        <div style={{
          marginLeft:'10px',
          marginTop:"10px"
        }}>
        <Typography variant='h6'>Welcome Back !{user.name}</Typography>
        <Typography variant='h6'>{user.email}</Typography>
        </div>
      </Paper>
      <Paper sx={{marginTop:'10px'}}>
        <Typography variant="h5" textAlign={'center'}>Your Recipes</Typography>
        <Grid container item xs={12} md={12} spacing={2}>
        {
          loading?
          <h1>loading...</h1>:
          !reciepies.length?
          <Typography variant='h6' textAlign='center'>Your Recipies list is Empty</Typography>:
          reciepies.map((i,index)=>{

            return <Grid item xs={12} md={4} key={index}>
             <ReciepeCard 
            image={i.recipeImage}
            id={i.id}
            title={i.recipeName}
            />
          </Grid>
          })
        }
        </Grid>
      </Paper>
    </Container>
    </>
  )

}

export default Profile