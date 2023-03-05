import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import services from '../services/service'
import ReciepeCard from '../lib/card/card'

function Favourite(){

  const [fvrts,setFvrts] = useState([])

  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    let fvrt = localStorage.getItem('favourite')

    fvrt = JSON.parse(fvrt)

    if(!fvrt.length){

      setLoading(false)
      return
    } 

    let promises = []

    fvrt.forEach((i)=>{

        promises.push(services.getSingleData(i,'recipies'))

    })

    Promise.all(promises).then((res)=>{

      setFvrts(res)

      setLoading(false)

    })

  },[])

  return(
    <Container>
      <Typography variant='h5' textAlign="center">Your Favourites</Typography>
      <Grid container item xs={12} md={12}>
         {
          loading?
          <Typography variant='h6' textAlign={'center'}>loading...</Typography>:
          !fvrts.length?
          <Typography>Your Favourites is Empty</Typography>:
          fvrts.map((i,index)=>{

            return<Grid item xs={12} md={4} key={index}>
              <ReciepeCard 
              image={i.recipeImage}
              id={i.id}
              title={i.recipeName}
              />
            </Grid>

          })
         }
      </Grid>
    </Container>
  )

}

export default Favourite