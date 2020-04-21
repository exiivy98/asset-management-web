<template>
<div>
    <div class="logo"></div>
    <p class="message">로그인 후 이용가능한 서비스입니다</p>
    <div class="login-container">
        <v-form>
            <div class="login-form">
                <v-text-field 
                    label="아이디"
                    type="text"
                    required
                />
                <v-text-field 
                    label="비밀번호"
                    type="password"
                    required
                />
                <v-btn type="submit"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    :style="{'color': '#fff'}"
                >로그인</v-btn>
                <div :style="{'text-align': 'left'}">
                    <v-checkbox
                        label="로그인 상태유지"
                        class="check-box"
                        v-model="saveState"
                    />
                    <v-checkbox
                        label="아이디 저장"
                        class="check-box"
                        v-model="saveId"
                    />
                </div>
                
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
        }
    },

    head(){
        return {
            title: '로그인 | WDFO'
        }
    },
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

</style>