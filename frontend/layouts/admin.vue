<template>
<div>
    <nav>
        <div>
            <v-toolbar dense class="toolbar-background">
                <nuxt-link to="/manage/admin/home"
                    :style="{'textDecoration': 'none',
                        'color': '#fff',}"
                    class="title-font"
                >
                    {{this.user.name}} 관리자님의 WDFOTools
                </nuxt-link>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn text nuxt to="/manage/admin/profile">
                        <div :style="{'color': '#fff'}"
                            class="title-font"
                        >내 정보</div>
                    </v-btn>
                    <v-btn text nuxt to="/manage/admin/approve">
                        <div :style="{'color': '#fff'}"
                            class="title-font"
                        >가입승인</div>
                    </v-btn>
                    <v-btn text @click.prevent="onLogout">
                        <div :style="{'color': '#fff'}"
                            class="title-font"
                        >로그아웃</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </div>
    </nav>
    <nuxt />
</div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },

    computed: {
        user(){
            return this.$store.state.users.user;
        },
    },

    methods: {
        onLogout(){
            this.$store.dispatch('users/logOut');
            this.$router.push({
                    path: '/login'
            });
        }
    },

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

@media screen and (min-width: 447px) and (max-width: 520px) {
  .title-font {
    font-size: 12px;
  }
}

@media screen and (max-width: 446px) {
  .title-font {
    font-size: 10px;
  }
}

</style>