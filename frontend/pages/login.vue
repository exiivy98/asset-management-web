<template>
<div>
    <div class="logo"></div>
    <p class="message">로그인 후 이용가능한 서비스입니다</p>
    <div class="login-container">
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <div class="login-form">
                <v-text-field 
                    label="아이디"
                    type="text"
                    v-model="id"
                    :rules="idRules"
                    required
                />
                <v-text-field 
                    label="비밀번호"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                />
                <p v-if="this.idCheck === false"
                    :style="{'font-size': '13px',
                    'color': 'red',
                    'margin-bottom': '1em',
                }"
                >등록된 사용자가 아닙니다</p>
                <p v-else-if="this.passwordCheck === false"
                    :style="{'font-size': '13px',
                    'color': 'red',
                    'margin-bottom': '1em',
                }"
                >비밀번호가 올바르지 않습니다</p>
                <p v-else-if="this.approveCheck === false"
                    :style="{'font-size': '13px',
                    'color': 'blue',
                    'margin-bottom': '1em',
                }"
                >승인 대기 중입니다. 관리자에게 문의해주세요</p>
                <v-btn type="submit"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    :style="{'color': '#fff', 'margin-bottom': '20px'}"
                    @click.prevent="onSubmit"
                    :disabled="this.id == null || this.password == null"
                >로그인</v-btn>
            </div>
        </v-form>
    </div>
    <p class="find-message">
        <span
            :style="{'color': 'blue'}"
        >아이디/비밀번호</span> 찾기는
        <span
            :style="{'color': 'red'}"
        >관리자</span>에게 문의해주세요</p>
</div>
</template>

<script>
export default {
    data(){
        return{
            saveState: false,
            saveId: false,
            id: null,
            password: null,
            valid: false,
            idRules: [
                v => !!v || '아이디는 필수입니다',
                v => /^[a-zA-Z0-9_]{4,12}$/.test(v) || '아이디 형식이 올바르지 않습니다',
            ],
            passwordRules: [
                v => !!v || '비밀번호는 필수입니다',
                v => /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,24}$/.test(v)
                    || '비밀번호 형식이 올바르지 않습니다'
            ],
        }
    },

    head(){
        return {
            title: '로그인 | WDFO'
        }
    },

    computed: {
        user(){
            return this.$store.state.users.user;
        },
        idCheck(){
            return this.$store.state.users.idCheck;
        },
        passwordCheck(){
            return this.$store.state.users.passwordCheck;
        },
        approveCheck(){
            return this.$store.state.users.approveCheck;
        },
    },

    methods: {
        onSubmit(){
            if(!this.$refs.form.validate()){
                if(!this.idCheck === false || !this.passwordCheck === false){
                    alert('제대로 입력하지 않거나 체크하지 않은 항목이 있습니다');
                }
                
            }else{
                this.$store.dispatch('users/logIn', {
                    id: this.id,
                    password: this.password,
                }).then(()=>{
                    
                }).catch((err) => {
                    console.error(err);
                })
            }
        },
    },

    middleware: 'anonymous',
}
</script>

<style scoped>
.logo {
    height: 80px;
    background-image: url("../images/WDFO-logo-row.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 1em;
}

.message{
    color: rgb(10, 80, 150);
    font-size: 18px;
    font-weight: normal;

}

.login-container{
    text-align: center;
    margin: 0 auto;
}

.login-form{
    margin: 0 auto;
    width: 300px;
    padding-top: 20px;
}

.check-box{
    display: inline-block;
    padding-right: 10px;
}

.find-message{
    font-size: 15px;
    font-weight: normal;
}

.none {
  display: none !important;
}
</style>