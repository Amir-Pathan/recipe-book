import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const style={
  icon:{
    display:'flex',
    flexDirection:'row',
    justifyContent:"flex-end",
    marginBottom:'-15px',
    cursor:'pointer'
  },
  fvrt:{
    color:'red'
  }
}

export default function ReciepeCard(props) {

  const [isFvrt,setFvrt] =React.useState(false)

  const {image,id,title} =props

  const navigate = useNavigate()


  React.useEffect(()=>{


   let fvrts = localStorage.getItem('favourite')

    fvrts = JSON.parse(fvrts)

    console.log(fvrts);

     if(!fvrts.length) return

    setFvrt(fvrts.includes(id))

  },[])


  const handleFvrt =(e)=>{

    e.stopPropagation()

    let fvrts = localStorage.getItem('favourite')

    fvrts = JSON.parse(fvrts)

    if(isFvrt){

      fvrts= fvrts.filter((i)=>{

        return i!=id

      })

      localStorage.setItem('favourite',JSON.stringify(fvrts))

      setFvrt(false)

    }else{

      fvrts.push(id)

      localStorage.setItem('favourite',JSON.stringify(fvrts))

      setFvrt(true)

    }

  }


  return (
    <Card sx={{ maxWidth: 345 }} 
    onClick={()=>{

      navigate('/recipe/'+id)

    }}
    >
      <div style={style.icon}
      onClick={handleFvrt}
      
      >
        <FavoriteIcon style={
          isFvrt?style.fvrt:null
        }/>
      </div>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}
