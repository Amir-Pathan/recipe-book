import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import services from '../services/service'

const style={
  margin:{
    marginTop:'10px'
  }
}


function RecipeDetails(){

  const {id} = useParams()

  const [recipe,setReciepe] = useState({})

  const [isLoading,setLoading] = useState(true)

  useEffect(()=>{

    console.log(id);

      services.getSingleData(id,'recipies').then((res)=>{

        setReciepe(res)
        console.log(res);

        setLoading(false)



      }).catch((err)=>{

        console.log(err);

      })

  },[])

  return(
    <Container>
      {
        isLoading?
        <Typography variant='h6'>Loading...</Typography>:
        <Grid container item xs={12} md={12} style={style.margin}>
          <Grid item xs={12} md={6}>
            <img src={recipe.recipeImage} alt="" style={{width:'400px'}}/>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant='h6' style={style.margin}>{recipe.recipeName}</Typography>
            <div style={style.margin}>
              <Typography variant='h6' style={style.margin}>Ingriedients :</Typography>
              {
                recipe.recipeingridient.map((i,index)=>{

                  return <li key={index}>{i}</li>

                })
              }
            </div>
            <div>
              <p style={style.margin}>Description :</p>
              {recipe.recipeDescription}</div>
          </Grid>
        </Grid>
      }
    </Container>
  )

}

export default RecipeDetails