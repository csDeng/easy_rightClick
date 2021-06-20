import $axios from '../http/';

const api = {
    App : {
        get_list(){
            return $axios.get('/App')
        },
        delete(id){
            return $axios.delete('/App/'+id)
        },
        save(name, value){
            return $axios({
                url:'/App',
                data:{
                    name,
                    value
                },
                method:'POST'
            })
        },
        change(id,name,value){
            return $axios({
                url:`/App/${id}`,
                method:'POST',
                data:{
                    name,
                    value
                }
            })
        }
    }
}

export default api