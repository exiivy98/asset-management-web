<template>
<v-app>
    <v-row>
        <v-col cols="12" md="12">
            <v-container
                :style="{'margin-top': '30px'}"
            >
                <v-card class="card">
                    <p class="title">가입 승인 대기자</p>
                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="userlist"
                        hide-default-footer
                        item-key="name"
                        show-select
                        class="elevation-1"
                        :loading="this.loading_state"
                        loading-text="불러오는 중입니다..."
                        no-data-text="대기 중인 가입자가 없습니다"
                    >
                    </v-data-table>
                </v-card>
            </v-container>
            <v-container
                :style="{'text-align': 'center'}"
            >
                <v-btn type="text"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    class="approve-btn"
                    @click.prevent="sendForApp"
                    :disabled="this.selected.length==0? true : false"
                >가입 승인</v-btn>
            </v-container>

        </v-col>
    </v-row>
</v-app>
</template>

<script>
export default {
    layout: 'admin',

    mounted() {
        this.reloadList();
    },

    data(){
        return{
            headers: [
                {
                    text: '이름',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '아이디', value: 'userId' },
                { text: '성별', value: 'gender' },
                { text: '소속', value: 'department' },
                { text: '직책', value: 'position' },
            ],
            selected: [],

            userlist: [
                
            ],
            loading_state: true,
        }
    },

    methods: {
        sendForApp(){
            this.$store.dispatch('users/approveUser', this.selected)
                .then(()=>{
                }).catch((err) => {
                    console.log(err);
                });
        },

        reloadList(){
            this.$axios.post('http://localhost:3085/user/get/approve', {}, {
            }).then((data)=>{
                this.userlist.push(...data.data);
                this.loading_state = false;
            }).catch((err)=>{
                console.error(err);
            });
        },
    },

    middleware: 'admin'
}
</script>

<style scoped>
.card{
    padding: 10px;
    padding-top: 20px;
    text-align: center;
}

.title{
    display: block;
    margin-bottom: 20px;
}

.approve-btn{
    color: #fff;
}

</style>