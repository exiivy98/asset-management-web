<template>
<div>
    <div class="logo"></div>
    <p>이 페이지는 WDFO의 자산관리서비스 툴입니다
    <br/>진행하시려면 아래의 버튼을 눌러주세요</p>
    <div class="progress-btn">
        <v-btn nuxt to="/login"
        :style="{'backgroundColor': '#0f4c81',
            'color': '#fff',}" large rounded>
            &nbsp;진행하기
            <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },

    middleware: 'anonymous',
}
</script>

<style scoped>
.logo {
  height: 250px;
  background-image: url("../images/WDFO-logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 2em;
}

.progress-btn {
  margin-top: 2em;
}
</style>