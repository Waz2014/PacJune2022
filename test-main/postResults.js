const fetch = require('node-fetch'); // Used to make calls to APIs

const PostResults = async(data) =>{
    console.log('Results Data: ',data) // Shows the data given to the post call
    try{
    const results = await fetch(
        '/results',
        {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: {'Content-Type': 'application/json'}
        })

    return results
    }catch(e){
        console.log(e)
    }

}

module.exports=  PostResults