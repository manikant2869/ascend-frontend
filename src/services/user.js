import utils from "../utils/utils"
export default class UserService{
    signup(userdata){
        return utils.sendApiRequest("/user/signup","POST",userdata)
        .then((response)=>{
                if (!response.error) {
                  return response;
                } else {
                  return response;
                }
            
        },
        (error) => {
            throw new Error(error);
        }
        )
        .catch((err)=>{
            throw err;
        })
    }
    login(userdata){
      return utils.sendApiRequest("/user/login","POST",userdata)
            .then((response)=>{
              if(!response.error){
                return response
              }else{
                response
              }
            },
            (error)=>{
              throw new Error(error)
            }
            )
            .catch((err)=>{
              throw err ;
            })
    }
    addList(data){
      return utils.sendApiRequest("/user/add/list","POST",data)
      .then((response)=>{
        if(!response.error){
          return response
        }else{
          response
        }
      },
      (error)=>{
        throw new Error(error)
      }
      ).catch((err)=>{
        throw err;
      })
      
    }
    listAll(user_id){
      return utils.sendApiRequest("/user/list/all","POST",{id:user_id})
      .then((response)=>{
        if(!response.error){
          return response
        }else{
          response
        }
      },(error)=>{
        throw new Error(error)
      }).catch((err)=>{
        throw err;
      })
    }
    changeListId(data){
      return utils.sendApiRequest(`/user/change/item/${data.item_id}`,"PUT",{task_list_id:data.list_id})
      .then((response)=>{
        if(!response.error){
          return response
        }else{
          response
        }
      },
      (error)=>{
        throw new Error(error)
      }).catch((err)=>{
        throw err;
      })
    }
    deleteItem(data){
      return utils.sendApiRequest(`/user/delete/item/${data.item_id}`,"DELETE",data)
      .then((response)=>{
        if(!response.error){
          return response
        }else{
          response
        }
      },(error)=>{
        throw new Error(error)
      }).catch((err)=>{
        throw err;
      })
    }
    addListItem(data){
      return utils.sendApiRequest("/user/add/list/item","POST",data)
      .then((response)=>{
        if(!response.error){
          return response
        }else{
          response
        }
      },(error)=>{
        throw new Error(error)
      }).catch((err)=>{
        throw err;
      })
    }
    deleteList(listid){
      return utils.sendApiRequest(`/user/remove/list/${listid}`,"DELETE",listid)
      .then((response)=>{
        if(!response.error){
          return response
        }
        else{
          response
        }
      },(error)=>{
        throw new Error(error)
      }).catch((err)=>{
        throw err;
      })
    }
}