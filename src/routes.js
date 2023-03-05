import SignUp from "./signup";
import Login from "./login";
import Recipies from "./recipies";
import RecipeDetails from "./recipeDetails";
import Profile from "./profile";
import Favourite from "./favourite";

const publicRoutes = [
  {
    path:'/signup',
    component:<SignUp/>
  },
  {
    path:'/login',
    component:<Login/>
  }
]

const privateRoute=[
 /* {
    path:'/',
    component:<Recipies no={n} handle={(no)=>setNo(no)}/>
  }*/,
  {
    path:'/recipe/:id',
    component:<RecipeDetails/>
  },
  {
    path:'/profile',
    component:<Profile/>
  },
  {
    path:'/favourite',
    component:<Favourite/>
  },
  {
    path:'/signup',
    component:<SignUp/>
  },
  {
    path:'/login',
    component:<Login/>
  }
]

export {
  publicRoutes,
  privateRoute
}