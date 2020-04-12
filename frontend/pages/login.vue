<template>
  <div class="wrapper">
    <div class="container">
        <div class="box">
          <div class="header">
            <div class="title">LOGIN</div>
          </div>
          <div class="body" id="login-form">
            <div class="form-container">
            <!--div class="form-container" 
              :class="{'error' : this.res_ans}"-->
              <label for="id"></label>
              <input type="text" name="id" id="ID"
                placeholder="아이디"
                v-model="id" ref="id_form">
            </div>
            <div class="form-container">
            <!--div class="form-container" 
              :class="{'error' : this.res_ans}"-->
              <label for="password"></label>
              <input type="text" name="password" id="PASSWORD"
                placeholder="비밀번호"
                v-model="password" ref="pd_form">
            </div>
            <div class="sign-up">
              <p class="content">계정이 없으시다면
                <a href @click.prevent='moveSignUp'
                
                 class="sign-up-link">회원가입</a>을
                눌러주세요</p>
            </div>
          </div>
          <div class="footer">
            <a href @click.prevent='onLogin'>로 그 인</a>
          </div>
        </div>
    </div>
   </div>
</template>

<script>
export default {
  data() {
        return {
            id: '',
            password: '',
            title: '자산관리서비스 | 로그인',
        }
    },

    head(){
        return {
            title: this.title
        }
    },

    computed: {
      user(){
        return this.$store.state.users.user;
      }
    },

    methods: {
        onLogin() {
          
        },

        moveSignUp(){
          this.$router.push({
                path: '/signup'
          });
        },
    },

    //middleware: 'loginusers',

}
</script>

<style scoped>
.box {
  width: 330px;
  -webkit-box-shadow: 6px 6px 5px 0px rgba(138,138,138,1);
  -moz-box-shadow: 6px 6px 5px 0px rgba(138,138,138,1);
  box-shadow: 6px 6px 5px 0px rgba(138,138,138,1);
}

.box .footer a {
    display: inline-block;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
}

.title{
  color: #eaac9d;
}

@media screen and (max-width: 620px) {
.box {
    width: 100% !important;
  }
}

.header {
  border-bottom: 3px solid #eaac9d;
  background-color: #fff;
  border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em;
}

.body {
  background-color: #fff;
  padding: 2em 1em;
}

.body .form-container label, .body .form-container input {
  width: 100%;
}

.body .form-container label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  padding: 0.5em;
}

.body .form-container input {
  font-size: 1em;
  font-weight: bold;
  padding: 0.8em 1em;
  border-style: none;
  border-bottom-style: solid;
  border-color: #eee;
  transition: border-color 1s;
}

.body .form-container input:focus {
  outline-style: none;
  border-color: #eaac9d;
}

.body .form-container input::placeholder {
  color: #c2c2c2;
}

.body .form-container.error label {
  color: #ff0000;
}

.body .form-container.error input {
  background-color: rgba(255, 0, 0, 0.05);
  border-color: #ff0000;
}

.body .form-container {
  margin-bottom: 1.5em;
}

.footer {
  background-color: #eaac9d;
  border-bottom-left-radius: 1.5em;
  border-bottom-right-radius: 1.5em;
}

.sign-up{
  padding-top: 10px;
  text-align: center;
}

.sign-up .content{
  font-size: 0.8em;
  font-weight: bold;
  color: #b2b2b2;
}

.sign-up-link{
  text-decoration: none;
  color: #eaac9d
}
</style>