export default function({store, redirect}){
    if(store.state.users.user){
        if(store.state.users.user.adminState == "1"){
            redirect('/manage/admin/home');
        }else {
            redirect('/manage/auth/home');
        }
    }
}