export default (a,b) => {

  console.log ("aaaaaaaaa",a,b)
   
  return fetch('http://192.168.0.161:3000/users/login',{

      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: '11111' })
  })
    .then(response => response.json())
    .then((responseJson)=> {
        console.log ("response,.,...", responseJson)
        return responseJson.user
  })
  .catch(error=>console.log(error)) //to catch the errors if any 
}
