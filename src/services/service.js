import { db,auth } from "../firebase.confiq"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {query,addDoc,getDoc,collection,getDocs, where,doc} from "firebase/firestore"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { storage } from "../firebase.confiq"

const services={

  signUp:(email,password,name)=>{

    return new Promise((resolve,reject)=>{

          createUserWithEmailAndPassword(auth,email,password).then((res)=>{

            console.log(res.user.uid);

            addDoc(collection(db,'users'),{
              uid:res.user.uid,
              authProvider:'local',
              name:name,
              email:email,
              password:password
            }).then((response)=>{

              console.log(response.id);

              localStorage.setItem('user',JSON.stringify({
                id:response.id,
                name:name,
                uid:res.user.uid,
                email:email,
                id:response.id
              }))

              localStorage.setItem('favourite',JSON.stringify([]))

              resolve({
                success:true
              })

            })

          }).catch((err)=>{

            reject(err)

          })

    })

  },

  login:(email,password)=>{


    return new Promise((resolve,reject)=>{

         signInWithEmailAndPassword(auth,email,password).then((res)=>{


          console.log(res.user.uid);

          let q = query(collection(db,'users'),where('uid','==',res.user.uid))

          getDocs(q).then((res)=>{

            res.forEach(i=>{

              let allData = i.data()

              allData.id=i.id;

              localStorage.setItem('user',JSON.stringify(allData))

              resolve(allData)

            })

          })

          resolve(res);

         }).catch((err)=>{

          reject(err)

          console.log(err);

         })

    })

  },

  uploadImage:(img)=>{

    return new Promise((resolve,reject)=>{

      if(img===null){

        reject('select file')

      }

      const storageRef = ref(storage,img.name)

      const uploadTask = uploadBytesResumable(storageRef, img);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
 
        },
        (err) => reject(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                resolve(url)
            });
        }
    ); 

    })

  },
  addData:(colc,data)=>{

    return new Promise((resolve,reject)=>{

      addDoc(collection(db,colc),data).then((res)=>{

        resolve(true)

      }).catch((err)=>{

        reject(false)

      })

    })

  },

  getData:(colc,id)=>{

    return new Promise((resolve,reject)=>{

      if(!colc){

        reject(false)

      }

      let response;

      if(!id){

        response = query(collection(db,colc))

      }else{

        response=query(collection(db,colc),where('userId','==',id))

      }

      getDocs(response).then(res=>{

        const recipes=[]


        res.forEach((res)=>{

          let alldata = res.data()
              
          alldata.id=res.id

          recipes.push(alldata)
       })

      resolve(recipes)


      })

    })

  },

  getSingleData:(id,colc)=>{

    console.log(colc,id);

    return new Promise((resolve,reject)=>{

      const dc = doc(db,colc,id)

      getDoc(dc).then((res)=>{

        let allData = res.data()

        allData.id=res.id

        resolve(allData)

      }).catch((err)=>{
        reject(err)
      })

    })

  },

  searchDoc:(colc,search)=>{

    return new Promise((resolve,reject)=>{

      let q = query(collection(db,colc),where('recipeName','==',search))


      getDocs(q).then((res)=>{


        if(res.docs.length===0){

          return q = query(collection(db,colc),where('recipeingridient','array-contains',search))

        }

        const recipes=[]


        res.forEach((res)=>{

          let alldata = res.data()
              
          alldata.id=res.id

          recipes.push(alldata)
       })

      resolve(recipes)

      }).then((qu)=>{

        getDocs(qu).then((res)=>{

        
          const recipes=[]


          res.forEach((res)=>{
  
            let alldata = res.data()
                
            alldata.id=res.id
  
            recipes.push(alldata)
         })

         resolve(recipes)

        })

      }).catch((err)=>{

        reject(err)

      })

    })

  }

}


export default services