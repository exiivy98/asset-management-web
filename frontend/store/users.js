export const state = () => ({
    user: null,
    idPossible: false,
    idCheck: null,
    passwordCheck: null,
    approveCheck: null,
});

export const mutations = {
    setUser(state, payload){
        state.user = payload;
    },
    setIdCheck(state, bool){
        state.idCheck = bool;
    },
    setPdCheck(state, bool){
        state.passwordCheck = bool;
    },
    setIdPossible(state, bool){
        state.idPossible = bool;
    },
    setApCheck(state, bool){
        state.approveCheck = bool;
    },
};

export const actions = {

    // 유저 불러오기 
    async loadUser({commit}){
        try{
            const res = await this.$axios.get('http://localhost:3085/user', {
                withCredentials: true,
            })
            commit('setUser', res.data);
        }catch(err){
            console.error(err);
        }
    },

    // 회원가입 
    signUp({commit}, payload){
        this.$axios.post('http://localhost:3085/user', {
            id: payload.id,
            password: payload.password,
            name: payload.name,
            gender: payload.gender,
            position: payload.position,
            department: payload.department,
            phone: payload.phone,
            adminState: payload.adminState,
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.error(err);
        });
    },

    // 아이디 중복 확인
    overLap({commit}, payload){
        this.$axios.get('http://localhost:3085/user/idOverlap', {
            params: {
                id: payload.id,
            }
            
        }).then((res) => {
            if(res.data.errorCode == null){
                commit('setIdPossible', true);
            }else{
                commit('setIdPossible', false);
            }
        }).catch((res) => {
            console.log(res);
            alert('알 수 없는 오류가 발생하였습니다. 새로고침을 진행해주세요.')
        });
    },

    // 로그인
    logIn({commit, state}, payload){
        this.$axios.post('http://localhost:3085/user/login', {
            id: payload.id,
            password: payload.password,
        },{
            withCredentials: true,
        }).then((res) => {
            if(res.data.reason == null){
                commit('setUser', {
                    id: res.data.id,
                    userId: res.data.userId,
                    name: res.data.name,
                    gender: res.data.gender,
                    department: res.data.department,
                    position: res.data.position,
                    adminState: res.data.adminState,
                    phone: res.data.phone,
                });
                commit('setApCheck', true);
                
                if(state.user.adminState == "1"){
                    this.$router.push({
                        path: '/manage/admin/home'
                    })
                }else{
                    this.$router.push({
                        path: '/manage/auth/home'
                    })
                }

            }else{
                if(res.data.reason == "No Users"){
                    commit('setIdCheck', false);
                    commit('setPdCheck', null);
                    commit('setApCheck', null);
                }else if(res.data.reason == "Wrong Password"){
                    commit('setIdCheck', true);
                    commit('setPdCheck', false);
                    commit('setApCheck', null);
                }else if(res.data.reason == "승인 대기중입니다"){
                    commit('setIdCheck', null);
                    commit('setPdCheck', null);
                    commit('setApCheck', false);
                    
                }
            }
            
        }).catch((err) => {
            console.log(err.status);
        });
        
    },

    // 로그아웃
    logOut({commit}){
        this.$axios.post('http://localhost:3085/user/logout', {}, {
            withCredentials: true,
        })
            .then((data) => {
                commit('setUser', null);
                this.$router.push({
                    path: '/login'
                });
            }).catch((err) => {
                console.error(err);
            });
    },

    // 유저 가입 승인
    approveUser({commit}, payload){
        this.$axios.post('http://localhost:3085/user/approve', {
            payload
        }).then((res) => {
            console.log('succeed');
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 유저 정보 변경
    reviseUser({commit}, payload){
        this.$axios.post('http://localhost:3085/user/revise', {
            payload
        }).then((res) => {
            console.log('succeed');
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 유저 삭제
    deleteUser({commit}, payload){
        this.$axios.post('http://localhost:3085/user/delete', {
            payload
        }).then((res) => {
            console.log('succeed');
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },
}