<template>
<div>
    <div class="logo"></div>
    <div class="login-container">
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <div class="login-form">
                <p :style="{'font-size': '13px',
                    'color': 'red'
                }"
                >*는 필수입력사항입니다</p>
                <p>아이디* (4~12자)</p>
                <v-text-field 
                    label="아이디"
                    type="text"
                    v-model="id"
                    :rules="idRules"
                    required
                    solo
                    clearable
                />
                <v-btn type="text"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    class="overlap-btn"
                    :disabled="this.id=='' || this.id==null? true : false"
                    @click.prevent="checkOverlap"
                >중복확인</v-btn>
                <p :style="{'font-size': '13px',
                    'color': 'blue',
                    'padding-top': '0.5em',
                }"
                    :class="{'none': !this.idPossible || this.checkCount == 0}"
                >사용가능한 아이디입니다</p>
                <p :style="{'font-size': '13px',
                    'color': 'red',
                    'padding-top': '0.5em',
                }"
                    :class="{'none': this.idPossible || this.checkCount == 0}"
                >이미 등록된 아이디입니다</p>
                
                <p :style="{'margin-top' : '2em'}"
                >비밀번호* (8~24자)</p>
                <v-text-field 
                    label="비밀번호"
                    required
                    v-model="password"
                    :rules="passwordRules"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    solo
                    @click:append="show1 = !show1"
                />
                <p>비밀번호 확인*</p>
                <v-text-field 
                    label="비밀번호 확인"
                    required
                    v-model="passwordCheck"
                    :rules="passwordCheckRules"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    solo
                    @click:append="show2 = !show2"
                />
                <p>이름*</p>
                <v-text-field 
                    label="이름"
                    type="text"
                    v-model="name"
                    required
                    solo
                    clearable
                />
                <p>성별*</p>
                <v-radio-group v-model="gender" row
                    :style="{'margin-top': '0'}"
                    :rules="[v =>  !!v || '성별을 체크는 필수입니다']"
                >
                    <v-radio label="남자" value="남자"
                        color="rgb(10, 80, 150)"
                    ></v-radio>
                    <v-radio label="여자" value="여자"
                        color="rgb(10, 80, 150)"
                    ></v-radio>
                </v-radio-group>
                <p>직책</p>
                <v-text-field 
                    label="직책"
                    type="text"
                    v-model="position"
                    required
                    solo
                    clearable
                />
                <p>소속</p>
                <v-text-field 
                    label="소속"
                    type="text"
                    v-model="department"
                    required
                    solo
                    clearable
                />
                <p>연락처*</p>
                <v-text-field 
                    label="- 없이 입력"
                    type="text"
                    v-model="phone"
                    :rules="phoneRules"
                    required
                    solo
                    clearable
                />
                <div class="non">
                    <p>관리자 권한</p>
                    <v-checkbox
                        label="관리자 권한"
                        v-model="adminState"
                        :style="{'margin-top' : '0',
                            'margin-bottom' : '1em'
                        }"
                    />
                </div>
                <v-card>
                    <v-checkbox
                        class="check-box"
                        v-model="checkState"
                        color="rgb(10, 80, 150)"
                        :rules="[v =>  !!v || '']"
                    />
                    <div class="inline-block">
                        <p>개인정보활용동의*</p>
                    </div>
                    <v-btn type="text"
                        width="50px"
                        height="30px"
                        color="#eee"
                        class="show-btn"
                        @click.prevent="showInfomation"
                    >{{showInfo? '닫기': '보기'}}</v-btn>
                    <v-container class="info"
                        :class="{'none' : !this.showInfo}"
                    >
                        <p>WDFO 자산관리툴에서는 고객의 데이터 관리를 위해 직원의 데이터를 저장하며, 직원은 이에 동의하지 않을 권리가 있습니다.</p>
                        <p>직원의 데이터는 회원가입에 필수적인 수집 항목으로 해당 정보를 직원으로부터 제공받지 못하면 WDFO 자산관리툴을 이용할 수 없습니다.</p>
                        <p>WDFO 자산관리툴에서 수집된 개인 정보는 서비스 이용을 위한 목적 외에는 사용되지 않습니다.</p>
                        <p>WDFO 자산관리툴에서 수집된 직원의 데이터는 기업과 직원 간 계약된 보관 기간이 지나면 자동으로 삭제됩니다.</p>
                    </v-container>
                </v-card>
                <v-btn type="submit"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    class="signup-btn"
                    :disabled="this.checkState? false : true"
                >회원가입</v-btn>
                
            </div>
        </v-form>
    </div>
</div>  
</template>

<script>
export default {
    data(){
        return{
            id: '',
            password: '',
            passwordCheck: '',
            name: '',
            position: '',
            department: '',
            gender: '',
            phone: '',
            show1: false,
            show2: false,
            checkCount: 0,
            checkState: false,
            showInfo: false,
            adminState: false,
            valid: false,
            idRules: [
                v => !!v || '아이디는 필수입니다',
                v => /^[a-zA-Z0-9_]{4,12}$/.test(v) || '아이디가 올바르지 않습니다'
            ],
            passwordRules: [
                v => !!v || '비밀번호는 필수입니다',
                v => /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,24}$/.test(v)
                    || '비밀번호가 올바르지 않습니다'
            ],
            passwordCheckRules: [
                v => !!v || '비밀번호 확인은 필수입니다',
                v => v === this.password || '비밀번호가 동일하지 않습니다'
            ],
            phoneRules: [
                v => !!v || '연락처는 필수입니다',
                v => /^[0-9]+$/.test(v) || '숫자만 입력해주세요'
            ],
        }
    },

    head(){
        return {
            title: '회원가입 | WDFO'
        }
    },

    computed: {
        idPossible(){
            return this.$store.state.users.idPossible;
        }
    },

    methods: {
        showInfomation(){
            this.showInfo = this.showInfo? false : true;
        },

        checkOverlap(){
            
            this.checkCount++;
            this.$store.dispatch('users/overLap', {
                id: this.id,
            }).then(()=>{
                console.log('succeed');
                this.idState = true;
            }).catch((err) => {
                console.log(err);
            });
        },

        onSubmitForm(){
            if(!this.idPossible){
                alert('아이디 중복체크를 해주세요');
            }

            if(!this.$refs.form.validate()){
                alert('제대로 입력하지 않거나 체크하지 않은 항목이 있습니다');
            }else{
                this.$store.dispatch('users/signUp', {
                    id: this.id,
                    password: this.password,
                    name: this.name,
                    gender: this.gender,
                    position: this.position,
                    department: this.department,
                    phone: this.phone,
                    adminState: this.adminState,
                }).then(() => {
                    alert('회원가입 신청이 완료되었습니다. 관리자 승인 후 로그인 가능합니다.')
                    this.$router.push({
                        path: '/login',
                    });
                }).catch(() => {
                    alert('회원가입 실패');
                })
            }
        }
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
    margin-top: 2em;
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

.login-form p{
    text-align: left;
    padding-bottom: 1em;
}

.signup-btn{
    color: #fff;
    margin-top: 1em;
    margin-bottom: 2em;
}

.overlap-btn{
    color: #fff;
    margin-top: 0;
}

.check-box{
    display: inline-block;
    padding-right: 10px;
}

.inline-block{
    display: inline-block;
    
}

.show-btn{
    color: #555;
    margin-top: 1.5em;
    margin-bottom: 2em;
    margin-left: 1em;
}

.info{
    font-size: 13px;
}

.none {
  display: none !important;
}
</style>