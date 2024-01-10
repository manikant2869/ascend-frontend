export default  {
    sendApiRequest: async function(api,method,body){
        const requestOptions = {
            method: method,
            headers: {
                "Content-Type" : "application/json" ,
                "Accept" : "application/json"
            } ,
            body : JSON.stringify(body)
        }
        if(method === "DELETE"){
            delete requestOptions.body
        }
        const url = import.meta.env.VITE_APP_API_BASEURL + api
        console.log(url)
        if(method === "DELETE" || method === "GET"){
           delete requestOptions.body
        }
        try{
           const response = await fetch(url,requestOptions)
           const body = await response.text()
           if (response.status != 200) {
            throw body;
           }
            const data = body.includes("{") ? JSON.parse(body) : body;
            return  data;

        }
        catch(err){
          throw err
        }

    }
}