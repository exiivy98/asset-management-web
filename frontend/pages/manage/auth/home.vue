<template>
  <v-row>
    <v-col cols="12" md="4">
        <v-container>
            <v-card>
                <v-container
                    :style="{'text-align': 'center'}"
                >
                    <p class="customer-title"
                    >고객 추가하기</p>

                    <v-form ref="form" v-model="valid" 
                        @submit.prevent="onCustomerForm"
                        class="form-padding">
                        <p>고객이름</p>
                        <v-text-field 
                            label="이름"
                            type="text"
                            v-model="name"
                            :rules="[v =>  !!v || '이름은 필수입니다']"
                            required
                            solo
                            clearable
                        />

                        <p>성별</p>
                        <v-radio-group v-model="gender" row
                            :style="{'margin-top': '0'}"
                            :rules="[v =>  !!v || '성별을 체크는 필수입니다']"
                        >
                            <v-radio label="남자" value="남자"
                                color="rgb(10, 80, 150)"
                            ></v-radio>
                            <v-radio label="여자" value="여자"
                                color="rgb(10, 80, 150)"
                            ></v-radio>
                        </v-radio-group>

                        <p>생년월일</p>
                        <v-text-field 
                            label="생년월일 6자리 숫자만 입력"
                            type="text"
                            v-model="birth"
                            :rules="[v =>  !!v || '생년월일은 필수입니다']"
                            required
                            solo
                            clearable
                        />

                        <p>연락처</p>
                        <v-text-field 
                            label="- 없이 입력"
                            type="text"
                            v-model="phone"
                            :rules="phoneRules"
                            required
                            solo
                            clearable
                        />

                        <v-btn type="text"
                            color="rgb(10, 80, 150)"
                            class="signup-btn"
                            :disabled="this.valid? false: true"
                        >추가하기</v-btn>

                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </v-col>
    <v-col cols="12" md="8">
        <v-container>
            <v-card>
                <v-container>
                    <div>
                    <p class="title">나의 고객</p>
                    <v-text-field
                        class="search-bar"
                        v-model="my_search"
                        append-icon="mdi-magnify"
                        label="검색"
                        single-line
                        hide-details
                    ></v-text-field>
                    </div>
                    <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="myuserlist"
                        :single-select="singleSelect"
                        :search="my_search"
                        item-key="name"
                        show-select
                        :items-per-page="itemPerPage"
                        class="elevation-1"
                        :loading="this.my_loading_state"
                        loading-text="불러오는 중입니다..."
                        no-data-text="고객이 존재하지 않습니다"
                    >
                    </v-data-table>
                </v-container>
            </v-card>
        </v-container>
        <v-container>
            <v-btn type="text"
                color="rgb(10, 50, 150)"
                class="customer-btn"
                :disabled="this.selected.length == 1? false:true"
            >고객 자산 분석하기</v-btn>
        </v-container>
    </v-col>
</v-row>
</template>

<script>
export default {
    layout: 'auth',
    data(){
        return{
            name: '',
            adminId: 2,
            gender: '',
            phone: '',
            birth: '',
            valid: false,
            dialog: false,
            phoneRules: [
                v => !!v || '연락처는 필수입니다',
                v => /^[0-9]+$/.test(v) || '숫자만 입력해주세요'
            ],
            headers: [
                {
                    text: '이름',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '고유ID', value: 'id' },
                { text: '성별', value: 'gender' },
                { text: '생년월일', value: 'birth' },
                { text: '전화번호', value: 'phone' },
            ],
            singleSelect: true,
            myuserlist: [
                
            ],
            selected: [],
            my_loading_state: true,
            my_search: '',
            itemPerPage: 5,
        }
    },

    mounted() {
        this.getMyCustomers();
    },

    methods: {
        onCustomerForm(){
                this.$store.dispatch('users/newCustomer', {
                    userId: this.adminId,
                    name: this.name,
                    gender: this.gender,
                    birth: this.birth,
                    phone: this.phone,
                }).then(() => {
                    
                }).catch(() => {
                    alert('고객 추가 실패');
                })
        },

        getMyCustomers(){
            this.$axios.post('/customer/list', {
                id: this.adminId,
            }).then((data)=>{
                this.myuserlist.push(...data.data);
                this.my_loading_state = false;
            }).catch((err)=>{
                console.error(err);
            });
        },
    },
    middleware: 'authenticated',
}
</script>

<style scoped>
.customer-title{
    padding-bottom: 10px;
}

.title{
    display: inline-block;
    padding-right: 50px;
    padding-left: 10px;
}

.search-bar{
    display: inline-block;
    padding-top: 0;
    padding-bottom: 10px;
}

.form-padding{
    text-align: left;
}

.form-padding p{
    padding-bottom: 5px;
    padding-left: 3px;
}

.family-btn{
    color: #fff;
    width: 100%;
    margin-bottom: 2em;
}

.customer-btn{
    color: #fff;
    width: 100%;
}

.facustomer-btn{
    color: #fff;
    width: 40%;
    display: inline-block;
}

.signup-btn{
    color: #fff;
    width: 100%;
}
</style>