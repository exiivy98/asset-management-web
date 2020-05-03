export default function({store, redirect}){
    if(store.state.users.user){
        if(store.state.users.user.adminState == "0"){
            redirect('/manage/auth/home');
        }
    }else{
        redirect('/login');
    }
}