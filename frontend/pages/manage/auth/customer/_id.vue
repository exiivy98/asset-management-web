<template>
<v-app>
  <v-row>
    <div :style="{'width': '97%', 'margin': '0 auto'}">
        <v-card :style="{'margin-top': '10px'}">
            <div :style="{'padding-top': '20px', 'padding-bottom': '20px'}">
                <div class="title-container">
                    <p :style="{'font-size': '15px',
                                'display': 'inline-block'}">
                        {{this.customerName}}님의 자산 현황</p>
                </div>
                <div :style="{'width': '90%', 'margin': '0 auto', 'margin-bottom': '10px'}">
                    <v-card>
                        <p :style="{'text-align': 'center', 'padding-top': '10px'}">
                            자산 페이지
                        </p>
                        <div :style="{'text-align': 'center', 'padding-bottom': '10px'}">
                            <v-btn color="rgb(10, 50, 150)" dark
                                @click.prevent="newquarter_dialog = true"
                            >
                                분기 추가
                            </v-btn>
                            <v-dialog
                                v-model="newquarter_dialog"
                                max-width="450"
                            >
                                <div :style="{'text-align': 'center', 'background-color': '#fff',
                                    'padding-top': '10px', 'padding-bottom': '10px'
                                }">
                                    <p>분기 추가</p>
                                    <v-text-field
                                        required
                                        v-model="quarterName"
                                        hide-details
                                        :style="{'margin': '0 auto', 'width': '300px'}"
                                    >
                                    </v-text-field>
                                    <div :style="{'margin-top': '20px'}">
                                        <v-btn type="text"
                                            color="#bbfccc"
                                            :style="{'color': '#000'}"
                                            @click.prevent="addQuarter"
                                            :disabled="this.quarterName == null || this.quarterName == ''"
                                        >추가하기</v-btn>
                                        <v-btn type="text"
                                            color="#eee"
                                            :style="{'color': '#000'}"
                                            @click.prevent="newquarter_dialog = false"
                                        >취소하기</v-btn>
                                    </div>
                                    
                                </div>
                            </v-dialog>
                            <v-btn :style="{'margin-left': '15px'}" dark
                                color="rgb(10, 50, 150)"
                                @click.prevent="deleteQuarter"
                            >
                                분기 삭제
                            </v-btn>
                            <v-btn
                                color="rgb(0, 212, 150)"
                                :style="{'color': '#fff', 'margin-left': '15px'}"
                                @click.prevent="add_family_dialog = true"
                            >
                                가족 추가하기
                            </v-btn>
                            <v-dialog
                                v-model="add_family_dialog"
                                max-width="300"
                            >
                                <add-family :id="parseInt(this.$route.params.id)"></add-family>
                            </v-dialog>
                            <v-btn
                                color="rgb(0, 212, 150)"
                                :style="{'color': '#fff', 'margin-left': '15px'}"
                                @click.prevent="del_family_dialog = true"
                            >
                                가족 삭제하기
                            </v-btn>
                            <v-dialog
                                v-model="del_family_dialog"
                                max-width="300"
                            >
                                <v-card>
                                    <v-container>
                                        <div :style="{'text-align': 'center'}">
                                            <p>가족을 선택해주세요</p>
                                            <v-select
                                                :items="family_name"
                                                v-model="del_selected_family"
                                            >

                                            </v-select>
                                            <v-btn type="text"
                                                color="rgb(0, 212, 150)"
                                                :style="{'color': '#fff'}"
                                                @click.prevent="deleteFamily"
                                                :disabled="del_selected_family.length == 0"
                                            >삭제하기</v-btn>
                                            <v-btn type="text"
                                                color="#eee"
                                                :style="{'color': '#000'}"
                                                @click.prevent="del_family_dialog = false"
                                            >취소하기</v-btn>
                                        </div>
                                    </v-container>
                                </v-card>
                            </v-dialog>
                        </div>
                        <v-container>
                            <v-card :style="{'text-align': 'center'}">
                                <div v-if="this.quarters.length == 0">
                                    <p
                                        :style="{'padding-top' : '10px',
                                            'padding-bottom': '10px'}"
                                    >분기별 데이터가 존재하지 않습니다</p>
                                </div>
                                <div v-else :style="{'text-align': 'center',
                                    'padding-top' : '10px', 'padding-bottom': '10px'
                                }">
                                    <v-btn  v-for="quarter in quarters" :key="quarter.id"
                                        color="#bbfccc"
                                        :style="{'text-align': 'center', 'margin-right': '10px',
                                            'width': '150px'
                                        }"
                                    >
                                        <v-checkbox hide-details
                                            :style="{'padding': '0', 'margin': '0'}"
                                            v-model="quarter_selected"
                                            :value="quarter.id" 
                                        ></v-checkbox>
                                        {{quarter.name}}
                                    </v-btn>
                                </div>
                            </v-card>
                        </v-container>
                    </v-card>
                </div>
                <div class="add-button-container">
                    <div class="table-container" v-for="quarter in quarters"
                        :key="quarter.id" :style="{'margin-bottom': '10px'}">
                        <asset-components
                            :quarterId="quarter.id"
                        ></asset-components>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
    </v-row>
</v-app>
</template>

<script>
import AddFamily from '~/components/AddFamily';
import AssetComponents from '~/components/AssetComponents';

export default {
    layout: 'auth',
    components: {
        AddFamily,
        AssetComponents,
    },

    computed: {
        termOb(){
            return this.$store.state.customers.termOb;
        },
        riskOb(){
            return this.$store.state.customers.riskOb;
        },
        purposeOb(){
            return this.$store.state.customers.purposeOb;
        },
        departOb(){
            return this.$store.state.customers.departOb;
        },
    },

    mounted(){
        this.getCustomerName();
        this.getFamily();
        this.getQuarters();
    },

    data(){
        return{
            customerName: '',
            quarterName: '',
            quarter_selected: [],
            quarters: [],
            quarter_state: 0,
            newquarter_dialog: false,
            add_family_dialog: false,
            family_name: [],
            del_selected_family: [],
            del_family_dialog: false,
        }
    },

    methods: {
        getFamily(){
            this.$axios.post('/customer/family/get', {
                id: this.$route.params.id,
            }).then((res) => {
                this.families = res.data;
                for(let i of this.families){
                    this.family_name.push(i.name);
                }
            }).catch((err) => {
                console.error(err);
            });
        },

        getQuarters(){
            this.$axios.post('/customer/get/quarter', {
                id: this.$route.params.id,
            }).then((data)=>{
                this.quarters.push(...data.data);
            }).catch((err)=>{
                console.error(err);
            });
        },

        addQuarter(){
            this.$store.dispatch('customers/newQuarter', {
                name: this.quarterName,
                customerId: this.$route.params.id,
            }).then(()=>{
                console.log('succeed');
            }).catch((err) => {
                console.log('err');
            })
        },

        deleteQuarter(){
            this.$store.dispatch('customers/deleteQuarter', {
                quarter:  this.quarter_selected,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
        },

        deleteFamily(){
            this.$store.dispatch('customers/deleteFamily', {
                family_name: this.del_selected_family,
                customerId: this.$route.params.id,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
        },

        getCustomerName(){
            this.$axios.post('/customer/name', {
                payload: this.$route.params.id,
            }).then((res)=>{
                this.customerName = res.data.name;
            }).catch((err)=>{
                console.log(err);
            });
        },
    },

    middleware: 'authenticated',
}
</script>

<style scoped>
*{
    font-family: 'Noto Sans KR', sans-serif
}

.table-container{
    width: 90%;
    height: 500px;
    overflow-x: scroll;
    margin: 0 auto;
    border-style: solid;
    border-color: #eee;
}

table{
    border-style: solid;
    border-collapse: collapse;
    font-size: 15px;
    
}

.title-container{
    text-align: center;
    width: 100%;
}

.add-button-container{
    text-align: center;
    width: 100%;
}
</style>