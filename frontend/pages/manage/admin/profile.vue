<template>
    <v-row>
        <v-col cols="12" md="3">
            <div class="component-padding">
                <v-card height="172px">
                    <div class="name-label">
                        <v-icon>mdi-account-circle</v-icon>
                        <p class="name-content">
                            {{this.user.name}} 님
                        </p>
                    </div>
                    <div class="except-name">
                        <v-btn depressed tile class="button"
                            color="#eee"
                            @click.prevent="changeToProfile"
                        >
                            <div :style="{'color': '#000'}">
                                내 정보 수정
                            </div>
                        </v-btn>
                        <v-btn depressed tile class="button"
                            color="#eee"
                            @click.prevent="changeToManage"
                        >
                            <div :style="{'color': '#000'}">
                                직원관리
                            </div>
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" md="9">
            <profile-setting v-if="showPComponent"
                :userId="this.user.id"
                :userName="this.user.name"
                :userPosition="this.user.position"
                :userDepartment="this.user.department"
                :userPhone="this.user.phone"
            ></profile-setting>
            <manage-auth v-else></manage-auth>
            
        </v-col>
    </v-row>
</template>

<script>
import ProfileSetting from '~/components/ProfileSetting';
import ManageAuth from '~/components/ManageAuth';

export default {
    components: {
        ProfileSetting,
        ManageAuth,
    },

    layout: 'admin',

    computed: {
        user(){
            return this.$store.state.users.user;
        },
    },

    data(){
        return{
            showPComponent: true,
        }
    },

    methods: {
        changeToProfile(){
            this.showPComponent = true;
        },

        changeToManage(){
            this.showPComponent = false;
        }
    },

    middleware: 'admin'
}
</script>

<style scoped>
.component-padding{
    padding: 10px;
}

.name-label{
    text-align: center;
    height: 50px;
    padding: 12.5px;
}

.name-content{
    display: inline-block;
    margin-left: 10px;
}

.except-name{
    height: 122px;
    text-align: center;
}

.button{
    width: 95%;
    margin: 1px;
    text-align: center;
}
</style>