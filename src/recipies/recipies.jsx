import { Container } from '@mui/system'
import React,{Component} from 'react'
import services from '../services/service'
import { Grid, TextField, Typography } from '@mui/material'
import ReciepeCard from '../lib/card'
import isAuntenticated from '../services/autenticated'

class Recipies extends Component{

  constructor(){
    super()
    this.state={
      recipies:[],
      isLoading:true,
      searchVal:''
    }
  }

  getAllRecipies(){

    console.log('work');


    services.getData('recipies').then((res)=>{

      this.setState({
        ...this.state,
        recipies:res,
        isLoading:false
      })

    }).catch((err)=>{

      console.log(err);

    })

  }

  componentDidMount(){

    

    this.getAllRecipies()

  }

  componentDidUpdate(prevProps){

    console.log(prevProps,this.props.no);

    if(prevProps.n!==this.props.n){

      this.getAllRecipies()

    }

  }

  searchResult(){

    if(!this.state.searchVal){

      this.getAllRecipies()

      return

    }

    services.searchDoc('recipies',this.state.searchVal).then((res)=>{

      this.setState({
        ...this.state,
        recipies:res
      })

    })

  }

  throttle(){

    let timer

    return()=>{

      clearTimeout(timer)

      timer =setTimeout(()=>{

        this.searchResult()

      },500)

    }

  }

  throt= this.throttle()

  render(){

    return(
      <Container style={{
        marginTop:'10px'
      }}>
        <TextField
        variant='outlined'
        fullWidth
        label='Search Recipe by name and Ingriedients'
        size='small'
        value={this.state.searchVal}
        onKeyUp={this.throt}
        onChange={(e)=>{

          this.setState({
            ...this.state,
            searchVal:e.target.value
          })

        }}
        />
        <Grid container item xs={12} md={12} spacing={1} >
           {
            this.state.isLoading?
            <Typography variant='h5' textAlign={'center'}>Loading...</Typography>
            :
            this.state.recipies.length===0?
              <Typography>Recipies Are Not Available</Typography>:
            this.state.recipies.map((i,index)=>{

            return <Grid item xs={12} md={4} key={index} >
                <ReciepeCard 
                image={i.recipeImage} 
                title={i.recipeName}
                id={i.id}
                />
              </Grid>

            })
           }
        </Grid>
      </Container>
    )

  }

}

export default Recipies