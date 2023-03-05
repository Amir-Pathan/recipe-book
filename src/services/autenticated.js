import { query,collection,getDoc,doc,getDocs, arrayUnion } from "firebase/firestore"
import { db } from "../firebase.confiq"

function isAuntenticated(){

//  let autenticated = false

  let user = localStorage.getItem('user')

  user = JSON.parse(user) 

  console.log(user);

  if(!user){

    return false

  }

  if(!user.id){

    return false

  }


  return true

}

export default isAuntenticated