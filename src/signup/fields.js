

const field =[
  {
    label:"Enter name",
    require:true,
    value:'name',
    type:'text',
    error:'nameError'
  },
  {
    label:"Enter email",
    require:true,
    value:'email',
    type:'email',
    error:'emailError'
  },
  {
    label:"Enter password",
    require:true,
    value:'password',
    type:'password',
    error:'passwordError'
  },
  {
    label:"repassword",
    require:true,
    value:'repassword',
    type:'password',
    error:'rePassword'
  },
]

export default field