<template>
<div>
    <v-card height="100%"
        class="com-padding"
    >
        <p class="title">직원 목록</p>
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
    <v-container
                :style="{'text-align': 'center'}"
            >
                <v-btn type="text"
                    width="300px"
                    color="rgb(10, 80, 150)"
                    class="approve-btn"
                    @click.prevent="sendForDel"
                    :disabled="this.selected.length==0? true : false"
                >직원 삭제</v-btn>
    </v-container>
</div>
</template>

<script>
export default {
    mounted() {
        this.$axios.post('http://localhost:3085/user/get/all', {
            id: this.id,
        }, {
        }).then((data)=>{
            
            this.userlist.push(...data.data);
            this.loading_state = false;
            
        }).catch((err)=>{
            console.error(err);
        });
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
            id: 1,
        }
    },

    methods: {
        sendForDel(){
            this.$store.dispatch('users/deleteUser', this.selected)
                .then(()=>{

                }).catch((err) => {
                    console.log(err);
                });
        }
    },
}
</script>

<style scoped>
.com-padding{
    margin: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
}

.element-box{
    padding: 20px;
}

.box-title{
    display: inline-block;
    margin-left: 10px;
    width: 50px;
}

.box{
    width: 300px;
    display: inline-block;
    margin-left: 30px;
}

.button{
    margin-left: 30px;
}

.title{
    display: block;
    margin-bottom: 20px;
}

.approve-btn{
    color: #fff;
}
</style>