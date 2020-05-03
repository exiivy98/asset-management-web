<template>
<div>
    <nav>
        <div>
            <v-toolbar dense class="toolbar-background">
                <nuxt-link to="/"
                    :style="{'textDecoration': 'none',
                        'color': '#fff',}"
                    class="title-font"
                >
                    와이즈 닥터스 패밀리 오피스
                </nuxt-link>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn text nuxt to="/login">
                        <div :style="{'color': '#fff'}"
                            class="title-font"
                        >SIGN IN</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup">
                        <div :style="{'color': '#fff'}"
                            class="title-font"
                        >SIGN UP</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </div>
    </nav>
    <div class="wrapper">
    <div class="container">
        <div class="contents-container">
            <nuxt />
        </div>    
    </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
body {
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Noto Sans KR', sans-serif;
}

.toolbar-background{
    background: rgb(10,80,150);
    background: linear-gradient(90deg,
      rgba(2,0,36,1) 0%,
      rgba(9,9,121,1) 0%,
      rgba(0,212,255,1) 100%);
}

.wrapper{
    display: table;
    width: 100%;
    /*background-color: rgba(0, 0, 0, 0.6);*/
    margin: 0 auto;
    height: 93vh;
}

.wrapper .container {
    display: table-cell;
    height: 100%;
    padding: 10px;
    vertical-align: middle;
}

.contents-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-weight: bold;
}

@media screen and (max-width: 480px) {
  .title-font {
    font-size: 12px;
  }
}

</style>