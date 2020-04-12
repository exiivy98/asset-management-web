<template>
  <div class="wrapper">
    <div class="container">
      <div class="contents-container">
        <div class="logo"></div>
        <p>이 사이트는 OOOO의 자산관리툴입니다</p>
        <div class="button-container">
            <a href class="progress-button" 
                @click.prevent='moveLogin'>
                진행하기
                <i class="material-icons">chevron_right</i>
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    methods: {
        moveLogin(){
            this.$router.push({
                path: '/login'
            });
        }
    }
}
</script>

<style scoped>
.contents-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 1.2em;
}

.contents-container .logo {
  height: 180px;
  background-image: url("../images/logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 2em;
}

.link-login{
    text-decoration: none;
    color: #eaac9d;
}

.button-container{
    margin: 0 auto;
    background-color: #eaac9d;
    max-width: 150px;
    height: 40px;
    border-radius: 1.5em;
    padding: 4px 0;
    padding-left: 15px;
}

.progress-button{
    font-size: 15px;
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    text-align: center;
}

i{
    padding-bottom: 2px;
}
</style>