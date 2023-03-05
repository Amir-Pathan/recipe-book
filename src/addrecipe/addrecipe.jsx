import React, { useState,useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { upload } from '@testing-library/user-event/dist/upload';
import services from '../services/service';


const style={
  margin:{
    marginTop:'10px'
  },
  modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  message:{
    color:'grey'
  },
  image:{
    marginTop:'10px',
    width:'70px'
  }

}



function AddRecipe({isOpen,handleClose}){

  const recipe ={
    recipeName:'',
    recipeImage:'',
    recipeingridient:[],
    recipeDescription:'',
  }

  const validationMessage = {
    recipeNameVaildation:'',
    recipeImageValidataion:'',
    recipeDescriptionValidation:'',
    recipeIngridientValidation:''
  }

  const ref = useRef(null)

  const [state,setState] = useState(recipe)

  const [validation,setValidation] = useState(validationMessage)

  const [ingridient,setIngridient] = useState('')

  const handleChange=(key,e)=>{

    setState(prev=>({
      ...prev,
      [key]:e
    }))

  }

  const targetRef=()=>{
    ref.current.click()
  }

  const addIngrident =()=>{

    if(!ingridient) return

    setState(prev=>({
      ...prev,
      recipeingridient:[...state.recipeingridient,ingridient]
    }))

    setIngridient('')
    
  }


  const submit=()=>{

    let validDetails = true;

    let name=""
    let image=''
    let ingriedients=''
    let description=''

    if(!state.recipeName){
       name="Enter recipe Name"
       validDetails=false
    }else{

      name=''

    }

    if(!state.recipeImage){

      image='Select Recipe Image'

      validDetails=false

    }else{

      image=''

    }

    if(!state.recipeingridient.length){
        ingriedients="Enter minimum 1 ingrideint"
        validDetails= false
    }else{

       ingriedients=''

    }

    if(!state.recipeDescription){

      description='enter description'

      validDetails=false

    }else{

      description=''

    }

    setValidation({
    recipeNameVaildation:name,
    recipeImageValidataion:image,
    recipeDescriptionValidation:description,
    recipeIngridientValidation:ingriedients 
    })

    if(validDetails){

     saveRecipe()
    
    }

  }


  const saveRecipe=()=>{

    let user = localStorage.getItem('user')

    user= JSON.parse(user)

    state.userId=user.id

    services.addData('recipies',state).then((res)=>{

      handleClose(false)

      clearField()

    }).catch((err)=>{
      alert('something wrong try again')
    })

  }

  const clearField=()=>{

    handleClose(false)

    setState(recipe)

    setValidation(validationMessage)

  }

  const uploadImage = (e)=>{

    services.uploadImage(e.target.files[0]).then((res)=>{

      handleChange('recipeImage',res)

    })

  }


  return(
    <Modal
     open={isOpen}
     onClose={()=>handleClose(false)}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
      <Box sx={style.modal}>
      <input type="file" accept="image/*" onChange={uploadImage} style={{display:'none'}}
      ref={ref}
      />
        <Typography variant='h6' textAlign={'center'}>Add Recipe</Typography>
        <img src={state.recipeImage} alt="" style={style.image}/><br/>
        <p style={style.message}>{validation.recipeImageValidataion}</p>
        <Button  variant='contained' style={style.margin}
        onClick={targetRef}
        >Upload image</Button>
        <TextField fullWidth size='small'
        value={state.recipeName}
        onChange={(e)=>handleChange('recipeName',e.target.value)}
        label="Enter Recipe Name"
        style={style.margin}
        helperText={validation.recipeNameVaildation}
        />
        <Grid container item xs={12} md={12} style={style.margin}>
          <Grid item xs={12} md={12}>
              <Typography>Ingridients :</Typography>
          </Grid>
          <p style={style.message}>{validation.recipeIngridientValidation} </p>
        {  
            state.recipeingridient.map((i,index)=>{

              return <Grid item xs={6} md={6} key={index}>
                <li>{i}</li>
              </Grid>

            })
        }
        </Grid>
        <Grid container item xs={12} md={12}>
        <Grid item xs={8} md={8} style={style.margin}>
          <TextField size='small'
          label="Enter Ingriedients"
          value={ingridient}
          onChange={(e)=>{

            setIngridient(e.target.value)

          }}
          />
        </Grid>
        <Grid item xs={4} md={4} style={style.margin}>
            <Button 
            onClick={addIngrident}
            >Add</Button>
        </Grid>
        </Grid>
        <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Recipe Description"
        style={{ width: '100%',marginTop:'10px' }}
        value={state.recipeDescription}
        onChange={e=>handleChange('recipeDescription',e.target.value)}
       />
       <p style={style.message}>{validation.recipeDescriptionValidation}</p>
       <Grid spacing={2} container item xs={12} md={12}>
        <Grid item xs={6} md={6}>
          <Button fullWidth variant='outlined' size='small' style={style.margin}
          onClick={clearField}
          >Cancel</Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button
          fullWidth variant='outlined' size='small' style={style.margin}
          onClick={submit}
          >Save</Button>
        </Grid>
       </Grid>
     </Box>
    </Modal>
  )

}

export default AddRecipe