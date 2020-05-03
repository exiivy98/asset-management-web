<template>
    <v-card height="100%"
        class="com-padding"
    >
        <div class="element-box">
            <p class="box-title">이름</p>
            <v-text-field 
                label="이름"
                type="text"
                v-model="name"
                required
                solo
                outlined
                dense
                hide-details
                readonly
                class="box"
            />
        </div>
        <div class="element-box">
            <p class="box-title">직책</p>
            <v-text-field 
                label="직책"
                type="text"
                v-model="position"
                solo
                dense
                outlined
                hide-details
                class="box"
            />
            <v-btn color="rgb(10, 50, 150)"
                class="button"
                @click.prevent="onPositionSubmit"
            >
                <div :style="{'color': '#fff'}">
                   변경하기
                </div>
            </v-btn>
        </div>
        <div class="element-box">
            <p class="box-title">소속</p>
            <v-text-field 
                label="소속"
                type="text"
                v-model="department"
                solo
                dense
                outlined
                hide-details
                class="box"
            />
            <v-btn color="rgb(10, 50, 150)"
                class="button"
                @click.prevent="onDepartSubmit"
            >
                <div :style="{'color': '#fff'}">
                   변경하기
                </div>
            </v-btn>
        </div>
        <div class="element-box">
            <p class="box-title">연락처</p>
            <v-text-field 
                label="- 없이 입력"
                type="text"
                v-model="phone"
                :rules="phoneRules"
                solo
                dense
                outlined
                class="box"
            />
            <v-btn color="rgb(10, 50, 150)"
                class="button"
                @click.prevent="onPhoneSubmit"
            >
                <div :style="{'color': '#fff'}">
                   변경하기
                </div>
            </v-btn>
        </div>
        
    </v-card>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number,
            required: true,
        },

        userName: {
            type: String,
            required: true,
        },

        userPosition: {
            type: String,
            required: true,
        },

        userDepartment: {
            type: String,
            required: true,
        },

        userPhone: {
            type: String,
            required: true,
        },
    },

    data(){
        return{
            name: this.userName,
            position: this.userPosition,
            department: this.userDepartment,
            phone: this.userPhone,
            phoneRules: [
                v => !!v || '연락처는 필수입니다',
                v => /^[0-9]+$/.test(v) || '숫자만 입력해주세요'
            ],
        }
    },

    methods: {
        onPositionSubmit(){
            this.$store.dispatch('users/reviseUser', {
                id: this.userId,
                col: 'position',
                content: this.position,
            }).then(()=>{
                console.log('succced');
            }).catch((err)=>{
                console.error(err);
            });
        },
        
        onDepartSubmit(){
            this.$store.dispatch('users/reviseUser', {
                id: this.userId,
                col: 'department',
                content: this.department,
            }).then(()=>{
                console.log('succced');
            }).catch((err)=>{
                console.error(err);
            });
        },
        
        onPhoneSubmit(){
            this.$store.dispatch('users/reviseUser', {
                id: this.userId,
                col: 'phone',
                content: this.phone,
            }).then(()=>{
                console.log('succced');
            }).catch((err)=>{
                console.error(err);
            });
        }
    },
}
</script>

<style scoped>
.com-padding{
    margin: 10px;
    padding-top: 30px;
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
</style>