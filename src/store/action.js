// 用户
export default{
    saveUser({commit},username){
       commit('saveUser',username);
    },
    saveCart({commit},count){
        commit('saveCart',count)
    }
}