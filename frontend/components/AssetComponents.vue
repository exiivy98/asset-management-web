<template>
  <div>
    <div :style="{'width': '3000px', 'padding': '10px'}">
        <div :style="{'text-align': 'left', 'margin-bottom': '20px'}">
            <button :style="{}" class="add-button"
                @click.prevent="showAddAssetContainer"
            >
                <v-icon center color="#fff" small
                >{{this.iconName}}</v-icon>
            </button>
            <button :style="{}" class="add-family-button"
                @click.prevent="showAddFAssetContainer"
            >
                <v-icon center color="#fff" small
                >{{this.iconFName}}</v-icon>
            </button>
            <v-btn
                color="#9696ff"
                :style="{'color': '#fff', 
                    'margin-left': '10px',
                    'margin-right': '10px'}"
                @click.prevent="drawChart"
                :disabled="hideGraph == false"
            >
                그래프 보기
            </v-btn>
            <v-btn
                color="rgb(0, 212, 150)"
                :style="{'color': '#fff', 'margin-right': '10px'}"
                @click.prevent="delete_asset = true"
                :disabled="asset_selected.length == 0"
            >
                자산 삭제
            </v-btn>
            <v-dialog
                v-model="delete_asset"
                max-width="450"
            >
                <v-card>
                    <v-container>
                    <div :style="{'text-align': 'center',}">
                        <p>이 자산을 삭제하시겠습니까?</p>
                        <v-btn type="text"
                            color="rgb(0, 212, 150)"
                            :style="{'color': '#fff'}"
                            @click.prevent="deleteAsset"
                        >삭제하기</v-btn>
                        <v-btn type="text"
                            color="#eee"
                            :style="{'color': '#000'}"
                            @click.prevent="delete_asset = false"
                        >취소하기</v-btn>
                    </div>
                    </v-container>
                </v-card>
            </v-dialog>
        </div>
        <div :style="{'text-align': 'left'}">
            <p :style="{'text-align': 'left',
                'margin-bottom': '3px', 'display': 'inline-block',
            }">{{customerName}}님의 자산</p>
        </div>
        <table class="customer-table">
            <thead>
                <tr>
                    <th class="delete"></th>
                    <th>목적</th>
                    <th>목표금액</th>
                    <th>자산구분</th>
                    <th>상품명</th>
                    <th>월투자예정금액</th>
                    <th>월투자금액</th>
                    <th>연 투자 금액</th>
                    <th>총 투자 금액</th>
                    <th>현재 평가 금액</th>
                    <th>기간</th>
                    <th>기간</th>
                    <th>위험도</th>
                    <th>기대BM</th>
                    <th>총수익률</th>
                    <th>자산 비중</th>
                    <th>달러 비중</th>
                    <th>비고</th>
                    <th>자동이체일</th>
                    <th>가입 시점</th>
                    <th>계좌번호</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in this.assets" v-bind:key="asset.id">
                    <td class="delete">
                        <v-checkbox hide-details 
                            :style="{'padding-left': '11px', 'margin-top': '0',
                                'margin-bottom': '5px'}"
                            v-model="asset_selected"
                            :value="asset.id"    
                        >
                        </v-checkbox>
                    </td>
                    <td>{{asset.purpose}}</td>
                    <td>{{parseInt(asset.goal).toLocaleString()}}</td>
                    <td>{{asset.depart}}</td>
                    <td>{{asset.name}}</td>
                    <td>{{parseInt(asset.month_ex).toLocaleString()}}</td>
                    <td>{{parseInt(asset.month_real).toLocaleString()}}</td>
                    <td>{{parseInt(asset.year).toLocaleString()}}</td>
                    <td>{{parseInt(asset.total).toLocaleString()}}</td>
                    <td>{{parseInt(asset.present).toLocaleString()}}</td>
                    <td>{{asset.enddate}}</td>
                    <td>{{asset.term}}</td>
                    <td>{{asset.risk}}</td>
                    <td>{{asset.ex_bm}}%</td>
                    <td>{{((parseInt(asset.present)-parseInt(asset.total))/parseInt(asset.total))*100}}%</td>
                    <td>{{Math.round((parseInt(asset.present)/mypresent)*100)}}%</td>
                    <td>{{asset.money}}</td>
                    <td>{{asset.date}}</td>
                    <td>{{asset.startdate}}</td>
                    <td>{{asset.account}}</td>
                    <td>{{asset.addition}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="delete"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{this.mymonthex.toLocaleString()}}</td>
                    <td>{{this.mymonthreal.toLocaleString()}}</td>
                    <td>{{this.myyear.toLocaleString()}}</td>
                    <td>{{this.mytotal.toLocaleString()}}</td>
                    <td>{{this.mypresent.toLocaleString()}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{typeof this.mypresent === "undefined" ? '' : ((this.mypresent-this.mytotal)/this.mytotal)*100}}%</td>
                    <td>{{Math.round((this.mypresent/totalpresent)*100)}}%</td>
                    <td>{{Math.round((this.myDollarCount/(this.myDollarCount+this.myWonCount))*100)}}%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <div class="add-asset-input" v-if="showAddAsset">
            <div>
                <input type="text" name="purpose" v-model="purpose" required
                    :style="{'margin-left': '50px'}"
                >
                <input type="text" name="goal" v-model="goal" placeholder="숫자만 입력">
                <input type="text" name="depart" v-model="depart" required>
                <input type="text" name="name" v-model="name">
                <input type="text" name="month_ex" v-model="month_ex" placeholder="숫자만 입력">
                <input type="text" name="month" v-model="month_real" placeholder="숫자만 입력">
                <input type="text" name="year" v-model="year" placeholder="숫자만 입력">
                <input type="text" name="total" v-model="total" placeholder="숫자만 입력">
                <input type="text" name="present" v-model="present" placeholder="숫자만 입력">
                <input type="text" name="enddate" v-model="enddate" placeholder="숫자만 입력">
                <select name="term" v-model="term" :style="{'width': '142.5px'}">
                    <option value="단기">단기</option>
                    <option value="중기">중기</option>
                    <option value="장기">장기</option>
                    <option value="중장기">중장기</option>
                    <option value="유동성">유동성</option>
                </select>
                <select name="term" v-model="risk" :style="{'width': '142.3px'}">
                    <option value="성장형">성장형</option>
                    <option value="안정형">안정형</option>
                    <option value="절대안정형">절대안정형</option>
                    <option value="절대성장형">절대성장형</option>
                    <option value="안정성장형">안정성장형</option>
                </select>
                <input type="text" name="ex_bm" v-model="ex_bm" placeholder="숫자만 입력">
                <input type="text" disabled v-model="profit" >
                <input type="text" disabled v-model="importance" >
                <input type="text" name="money" v-model="money">
                <input type="text" name="addition" v-model="addition">
                <input type="text" name="date" v-model="date" placeholder="숫자만 입력(8자리)">
                <input type="text" name="startdate" v-model="startdate">
                <input type="text" name="account" v-model="account">
            </div>
            <v-btn
                color="#ffd1d1"
                :style="{'color': '#000', 'width': '100%',
                    'margin-top': '10px'
                }"
                @click.prevent="add_asset_dialog = true"
            >
                자산 추가하기
            </v-btn>
            <v-dialog
                v-model="add_asset_dialog"
                max-width="300"
            >
                <v-card>
                    <v-container>
                    <div :style="{'text-align': 'center'}">
                        <p>이 내용으로 자산을 추가하시겠습니까?</p>
                        <v-btn type="text"
                            color="rgb(10, 50, 150)"
                            :style="{'color': '#fff'}"
                            @click.prevent="onSubmitAsset"
                        >추가하기</v-btn>
                        <v-btn type="text"
                            color="#eee"
                            :style="{'color': '#000'}"
                            @click.prevent="add_asset_dialog = false"
                        >취소하기</v-btn>
                    </div>
                    </v-container>
                </v-card>
            </v-dialog>
        </div>
        <div v-for="family in this.families" v-bind:key="family.id"
            :style="{'margin-top': '20px'}"
        >
        <div :style="{'text-align': 'left'}">
            <p :style="{'text-align': 'left',
                'margin-bottom': '3px', 'display': 'inline-block',
            }">{{family.name}}님의 자산</p>
        </div>
        <table class="customer-family-table">
            <thead>
                <tr>
                    <th class="delete"></th>
                    <th>목적</th>
                    <th>목표금액</th>
                    <th>자산구분</th>
                    <th>상품명</th>
                    <th>월투자예정금액</th>
                    <th>월투자금액</th>
                    <th>연 투자 금액</th>
                    <th>총 투자 금액</th>
                    <th>현재 평가 금액</th>
                    <th>기간</th>
                    <th>기간</th>
                    <th>위험도</th>
                    <th>기대BM</th>
                    <th>총수익률</th>
                    <th>자산 비중</th>
                    <th>달러 비중</th>
                    <th>비고</th>
                    <th>자동이체일</th>
                    <th>가입 시점</th>
                    <th>계좌번호</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="fasset in family_assets[family.id]" v-bind:key="fasset.id">
                    <td class="delete">
                        <v-checkbox hide-details 
                            :style="{'padding-left': '11px', 'margin-top': '0',
                                'margin-bottom': '5px'}"
                            v-model="asset_selected"
                            :value="fasset.id"    
                        >
                        </v-checkbox>
                    </td>
                    <td>{{fasset.purpose}}</td>
                    <td>{{parseInt(fasset.goal).toLocaleString()}}</td>
                    <td>{{fasset.depart}}</td>
                    <td>{{fasset.name}}</td>
                    <td>{{parseInt(fasset.month_ex).toLocaleString()}}</td>
                    <td>{{parseInt(fasset.month_real).toLocaleString()}}</td>
                    <td>{{parseInt(fasset.year).toLocaleString()}}</td>
                    <td>{{parseInt(fasset.total).toLocaleString()}}</td>
                    <td>{{parseInt(fasset.present).toLocaleString()}}</td>
                    <td>{{fasset.enddate}}</td>
                    <td>{{fasset.term}}</td>
                    <td>{{fasset.risk}}</td>
                    <td>{{fasset.ex_bm}}%</td>
                    <td>{{((parseInt(fasset.present)-parseInt(fasset.total))/parseInt(fasset.total))*100}}%</td>
                    <td>{{typeof ffpresent[family.id] === "undefined" ? '' : (parseInt(fasset.present)/ffpresent[family.id])*100}}%</td>
                    <td>{{fasset.money}}</td>
                    <td>{{fasset.date}}</td>
                    <td>{{fasset.startdate}}</td>
                    <td>{{fasset.account}}</td>
                    <td>{{fasset.addition}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="delete"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{typeof ffmonth_ex[family.id] === "undefined" ? '' : ffmonth_ex[family.id].toLocaleString()}}</td>
                    <td>{{typeof ffmonth_real[family.id] === "undefined" ? '' : ffmonth_real[family.id].toLocaleString()}}</td>
                    <td>{{typeof ffyear[family.id] === "undefined" ? '' : ffyear[family.id].toLocaleString()}}</td>
                    <td>{{typeof fftotal[family.id] === "undefined" ? '' : fftotal[family.id].toLocaleString()}}</td>
                    <td>{{typeof ffpresent[family.id] === "undefined" ? '' : ffpresent[family.id].toLocaleString()}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{(typeof fftotal[family.id] === "undefined") || 
                        (typeof ffpresent[family.id] === "undefined") ? 
                        '' : ((ffpresent[family.id] - fftotal[family.id])/fftotal[family.id])*100}}%</td>
                    <td>{{(typeof ffpresent[family.id] === "undefined") ?
                        '' : Math.round((parseInt(ffpresent[family.id])/totalpresent)*100)}}%</td>
                    <td>{{(isNaN(ffDollarCount[family.id]/(ffDollarCount[family.id]+ffWonCount[family.id]))*100)? '': Math.round((ffDollarCount[family.id]/(ffDollarCount[family.id]+ffWonCount[family.id]))*100)}}%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <div class="add-family-asset-input" v-if="showAddFAsset">
            <div>
                <input type="text" name="purpose" v-model="fpurpose" required
                    :style="{'margin-left': '50px'}"
                >
                <input type="text" name="goal" v-model="fgoal" placeholder="숫자만 입력">
                <input type="text" name="depart" v-model="fdepart" required>
                <input type="text" name="name" v-model="fname">
                <input type="text" name="month_ex" v-model="fmonth_ex" placeholder="숫자만 입력">
                <input type="text" name="month" v-model="fmonth_real" placeholder="숫자만 입력">
                <input type="text" name="year" v-model="fyear" placeholder="숫자만 입력">
                <input type="text" name="total" v-model="ftotal" placeholder="숫자만 입력">
                <input type="text" name="present" v-model="fpresent" placeholder="숫자만 입력">
                <input type="text" name="enddate" v-model="fenddate" placeholder="숫자만 입력">
                <select name="term" v-model="fterm" :style="{'width': '142.3px'}">
                    <option value="단기">단기</option>
                    <option value="중기">중기</option>
                    <option value="장기">장기</option>
                    <option value="중장기">중장기</option>
                    <option value="유동성">유동성</option>
                </select>
                <select name="term" v-model="frisk" :style="{'width': '142.3px'}">
                    <option value="성장형">성장형</option>
                    <option value="안정형">안정형</option>
                    <option value="절대안정형">절대안정형</option>
                    <option value="절대성장형">절대성장형</option>
                    <option value="안정성장형">안정성장형</option>
                </select>
                <input type="text" name="ex_bm" v-model="fex_bm" placeholder="숫자만 입력">
                <input type="text" disabled v-model="fprofit" >
                <input type="text" disabled v-model="fimportance" >
                <input type="text" name="money" v-model="fmoney">
                <input type="text" name="addition" v-model="faddition">
                <input type="text" name="date" v-model="fdate" placeholder="숫자만 입력(8자리)">
                <input type="text" name="startdate" v-model="fstartdate">
                <input type="text" name="account" v-model="faccount">
            </div>
            <v-btn
                color="#d4e5ff"
                :style="{'color': '#000', 'width': '100%',
                    'margin-top': '10px'
                }"
                @click.prevent="add_fasset_dialog = true"
            >
                가족 자산 추가하기
            </v-btn>
            <v-dialog
                v-model="add_fasset_dialog"
                max-width="450"
            >
                <v-card>
                    <v-container>
                        <div :style="{'text-align': 'center'}">
                            <p>가족을 선택해주세요</p>
                            <v-select
                                :items="family_name"
                                v-model="selected_family"
                            >

                            </v-select>
                            <p>이 내용으로 자산을 추가하시겠습니까?</p>
                            <v-btn type="text"
                                color="rgb(0, 212, 150)"
                                :style="{'color': '#fff'}"
                                @click.prevent="onFSubmitAsset"
                            >추가하기</v-btn>
                            <v-btn type="text"
                                color="#eee"
                                :style="{'color': '#000'}"
                                @click.prevent="add_fasset_dialog = false"
                            >취소하기</v-btn>
                        </div>
                    </v-container>
                </v-card>
            </v-dialog>
        </div>
        
    </div>
    <div :style="{'text-align': 'left'}">
            <p :style="{'text-align': 'left',
                'margin-bottom': '0', 'display': 'inline-block',
                'margin-top': '10px',
            }">합계</p>
        </div>
        <table class="total">
            <tbody>
                <tr>
                    <td class="delete"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{totalmonthex.toLocaleString()}}</td>
                    <td>{{totalmonthreal.toLocaleString()}}</td>
                    <td>{{totalyear.toLocaleString()}}</td>
                    <td>{{totaltotal.toLocaleString()}}</td>
                    <td>{{totalpresent.toLocaleString()}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{((totalpresent-totaltotal)/totaltotal)*100}}%</td>
                    <td></td>
                    <td>{{Math.round((totalDollarCount/(totalDollarCount+totalWonCount))*100)}}%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div :class="{'none': hideGraph}" :style="{'margin-top': '20px', 'width': '3000px', 'text-align': 'left'}">
            <canvas ref="graph1" width="400" height="400" :style="{'display': 'inline-block', 'padding-left': '10px'}"></canvas>
            <canvas ref="graph2" width="400" height="400" :style="{'display': 'inline-block', 'padding-left': '20px'}"></canvas>
            <canvas ref="graph3" width="400" height="400" :style="{'display': 'inline-block', 'padding-left': '20px'}"></canvas>
            <canvas ref="graph4" width="400" height="400" :style="{'display': 'inline-block', 'padding-left': '20px'}"></canvas>
            <canvas ref="graph5" width="400" height="400" :style="{'display': 'inline-block', 'padding-left': '20px'}"></canvas>
        </div>
  </div>
  </div>
</template>

<script>
export default {
    props: {
        quarterId: {
            type: Number,
            required: true,
        },
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

    data(){
        return{
            purpose: null, goal: null, depart: null, name: null, month_ex: null, month_real: null,
            year: null, total: null, present: null, enddate: null, term: null, risk: null, ex_bm: null,
            profit: null, importance: null, money: null, date: null, startdate: null, account: null,
            addition: null,

            fpurpose: null, fgoal: null, fdepart: null, fname: null, fmonth_ex: null, fmonth_real: null,
            fyear: null, ftotal: null, fpresent: null, fenddate: null, fterm: null, frisk: null, fex_bm: null,
            fprofit: null, fimportance: null, fmoney: null, fdate: null, fstartdate: null, faccount: null,
            faddition: null,

            mymonthex: 0,
            mymonthreal: 0,
            mytotal: 0,
            myyear: 0,
            mypresent: 0,
            myDollarCount: 0,
            myWonCount: 0,

            ffmonth_ex: [],
            ffmonth_real: [],
            fftotal: [],
            ffyear: [],
            ffpresent: [],
            ffDollarCount: [],
            ffWonCount: [],

            totalmonthex: 0,
            totalmonthreal: 0,
            totaltotal: 0,
            totalyear: 0,
            totalpresent: 0,
            totalDollarCount: 0,
            totalWonCount: 0,

            add_familyasset_dialog: false,
            selected: [],
            my_loading_state: true,
            add_fasset_dialog: false,
            myuserlist: [],
            assets: [],
            families: [],
            family_assets: [],
            family_name: [],
            asset_selected: [],
            selected_family: '',
            hideGraph: true,
            showAddAsset: false,
            showAddFAsset: false,
            add_asset_dialog: false,
            iconName: 'mdi-plus',
            iconFName: 'mdi-plus',
            delete_asset: false,
            customerName: '',
        }
    },

    mounted(){
        this.resetState();
        this.getCustomerName();
        this.getCustomerAsset();
        this.getFamily();
        this.getFamilyAsset();
    },

    methods: {
        getCustomerName(){
            this.$axios.post('/customer/name', {
                payload: this.$route.params.id,
            }).then((res)=>{
                this.customerName = res.data.name;
            }).catch((err)=>{
                console.log(err);
            });
        },

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

        deleteAsset(){
            this.$store.dispatch('customers/deleteAsset', {
                payload: this.asset_selected,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
        },

        getCustomerAsset(){
            this.$axios.post('/customer/get/customer/asset', {
                id: this.$route.params.id,
                quarterId: this.quarterId,
            }).then((res)=>{
                if(res.data.length != 0){
                    this.assets = res.data;
                }
                
                for(let i of this.assets){
                    if(!isNaN(parseInt(i.month_ex))){
                        this.mymonthex = this.mymonthex + parseInt(i.month_ex);
                    }
                    if(!isNaN(parseInt(i.month_real))){
                        this.mymonthreal = this.mymonthreal + parseInt(i.month_real);
                    }
                    if(!isNaN(parseInt(i.year))){
                        this.myyear = this.myyear + parseInt(i.year);
                    }
                    if(!isNaN(parseInt(i.total))){
                        this.mytotal = this.mytotal + parseInt(i.total);
                    }
                    if(!isNaN(parseInt(i.present))){
                        this.mypresent = this.mypresent + parseInt(i.present);
                    }
                    if(i.money != null && i.money != ''){
                        if(i.money == '$'){
                            if(!isNaN(parseInt(i.total))){
                                this.myDollarCount += parseInt(i.total);
                            }
                        }else if(i.money == '원' || i.money == '\\'){
                            if(!isNaN(parseInt(i.total))){
                                this.myWonCount += parseInt(i.total);
                            }
                        }
                    }
                    if(i.purpose != null && i.purpose != ''){
                        if(i.purpose in this.purposeOb|| i.purpose.replace(/(\s*)/g, "") in this.purposeOb){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setPurposeOb', {
                                    state: i.purpose.replace(/(\s*)/g, ""),
                                    money: parseInt(i.total),
                                    exists: true,
                                });
                            }
                        }else{
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setPurposeOb', {
                                    state: i.purpose.replace(/(\s*)/g, ""),
                                    money: parseInt(i.total),
                                    exists: false,
                                });
                            }
                            
                        }
                    }
                    if(i.depart != null && i.depart != ''){
                        if(i.depart in this.departOb || i.depart.replace(/(\s*)/g, "") in this.departOb){
                            if(!isNaN(parseInt(i.total))){
                                 this.$store.commit('customers/setDepartOb', {
                                    state: i.depart.replace(/(\s*)/g, ""),
                                    money: parseInt(i.total),
                                    exists: true,
                                });
                            }
                        }else{
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setDepartOb', {
                                    state: i.depart.replace(/(\s*)/g, ""),
                                    money: parseInt(i.total),
                                    exists: false,
                                });
                            }
                            
                        }
                    }
                    if(i.term != null && i.term != ''){
                        if(i.term == "단기"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setTermOb', {
                                    state: '단기',
                                    money: parseInt(i.total)
                                });
                            }
                        }else if(i.term == "중기"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setTermOb', {
                                    state: '중기',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                        else if(i.term == "장기"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setTermOb', {
                                    state: '장기',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                        else if(i.term == "중장기"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setTermOb', {
                                    state: '중장기',
                                    money: parseInt(i.total)
                                });
                            }
                        }else if(i.term == "유동성"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setTermOb', {
                                    state: '유동성',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                    }
                    if(i.risk != null && i.risk != ''){
                        if(i.risk == "안정형"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setRiskOb', {
                                    state: '안정형',
                                    money: parseInt(i.total)
                                });
                            }
                        }else if(i.risk == "성장형"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setRiskOb', {
                                    state: '성장형',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                        else if(i.risk == "절대안정형"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setRiskOb', {
                                    state: '절대안정형',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                        else if(i.risk == "절대성장형"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setRiskOb', {
                                    state: '절대성장형',
                                    money: parseInt(i.total)
                                });
                            }
                        }else if(i.risk == "안정성장형"){
                            if(!isNaN(parseInt(i.total))){
                                this.$store.commit('customers/setRiskOb', {
                                    state: '안정성장형',
                                    money: parseInt(i.total)
                                });
                            }
                        }
                    }
                }

                this.totalmonthex += this.mymonthex;
                this.totalmonthreal += this.mymonthreal;
                this.totalyear += this.myyear;
                this.totaltotal += this.mytotal;
                this.totalpresent += this.mypresent;
                this.totalDollarCount += this.myDollarCount;
                this.totalWonCount += this.myWonCount;

            }).catch((err)=>{
                console.log(err);
            });
        },

        getFamilyAsset(){
            this.$axios.post('/customer/family/asset', {
                id: this.$route.params.id,
                quarterId: this.quarterId,
            }).then((res) => {
                this.family_assets = res.data;
                for(let i in this.family_assets){
                    if(this.family_assets[i] != null){
                        if(this.family_assets[i].length != 0){
                            if(!isNaN(parseInt(this.family_assets[i][0].month_ex))){
                                if(this.ffmonth_ex[i] == null){
                                    this.ffmonth_ex[i] = 0;
                                }
                                this.ffmonth_ex[i] = this.ffmonth_ex[i] + parseInt(this.family_assets[i][0].month_ex);
                            }

                            if(!isNaN(parseInt(this.family_assets[i][0].month_real))){
                                if(this.ffmonth_real[i] == null){
                                    this.ffmonth_real[i] = 0;
                                }
                                this.ffmonth_real[i] = this.ffmonth_real[i] + parseInt(this.family_assets[i][0].month_real);
                            }

                            if(!isNaN(parseInt(this.family_assets[i][0].year))){
                                if(this.ffyear[i] == null){
                                    this.ffyear[i] = 0;
                                }
                                this.ffyear[i] = this.ffyear[i] + parseInt(this.family_assets[i][0].year);
                            }

                            if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                if(this.fftotal[i] == null){
                                    this.fftotal[i] = 0;
                                }
                                this.fftotal[i] = this.fftotal[i] + parseInt(this.family_assets[i][0].total);
                            }

                            if(!isNaN(parseInt(this.family_assets[i][0].present))){
                                if(this.ffpresent[i] == null){
                                    this.ffpresent[i] = 0;
                                }
                                this.ffpresent[i] = this.ffpresent[i] + parseInt(this.family_assets[i][0].present);
                            }

                            if(this.family_assets[i][0].money != null && this.family_assets[i][0].money != ''){
                                if(this.ffDollarCount[i] == null){
                                    this.ffDollarCount[i] = 0;
                                }

                                if(this.ffWonCount[i] == null){
                                    this.ffWonCount[i] = 0;
                                }
                                
                                if(this.family_assets[i][0].money == '$'){
                                    if(this.fftotal[i] != null && !isNaN(parseInt(this.fftotal[i]))){
                                        this.ffDollarCount[i] += + parseInt(this.family_assets[i][0].total);
                                    }
                                }else if(this.family_assets[i][0].money == '원' || this.family_assets[i][0].money == '\\'){
                                    if(this.fftotal[i] != null && !isNaN(parseInt(this.fftotal[i]))){
                                        this.ffWonCount[i] += + parseInt(this.family_assets[i][0].total);
                                    }
                                }
                            }

                            if(this.family_assets[i][0].purpose != null && this.family_assets[i][0].purpose != ''){
                                if(this.family_assets[i][0].purpose in this.purposeOb || this.family_assets[i][0].purpose.replace(/(\s*)/g, "") in this.purposeOb){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setPurposeOb', {
                                            state: this.family_assets[i][0].purpose.replace(/(\s*)/g, ""),
                                            money: this.family_assets[i][0].total,
                                            exists: true,
                                        });
                                    }
                                }else{
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setPurposeOb', {
                                            state: this.family_assets[i][0].purpose.replace(/(\s*)/g, ""),
                                            money: this.family_assets[i][0].total,
                                            exists: false,
                                        });
                                    }
                                    
                                }
                            }
                            
                            if(this.family_assets[i][0].depart != null && this.family_assets[i][0].depart != ''){
                                if(this.family_assets[i][0].depart in this.departOb || this.family_assets[i][0].depart.replace(/(\s*)/g, "") in this.departOb){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setDepartOb', {
                                            state: this.family_assets[i][0].depart.replace(/(\s*)/g, ""),
                                            money: this.family_assets[i][0].total,
                                            exists: true,
                                        });
                                    }
                                }else{
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setDepartOb', {
                                            state: this.family_assets[i][0].depart.replace(/(\s*)/g, ""),
                                            money: this.family_assets[i][0].total,
                                            exists: false,
                                        });
                                    }
                                    
                                }
                            }

                            if(this.family_assets[i][0].term != null && this.family_assets[i][0].term != ''){
                                if(this.family_assets[i][0].term == "단기"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setTermOb', {
                                            state: '단기',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }else if(this.family_assets[i][0].term == "중기"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setTermOb', {
                                            state: '중기',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                                else if(this.family_assets[i][0].term == "장기"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setTermOb', {
                                            state: '장기',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                                else if(this.family_assets[i][0].term == "중장기"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setTermOb', {
                                            state: '중장기',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }else if(this.family_assets[i][0].term == "유동성"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                       this.$store.commit('customers/setTermOb', {
                                            state: '유동성',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                            }

                            if(this.family_assets[i][0].risk != null && this.family_assets[i][0].risk != ''){
                                if(this.family_assets[i][0].risk == "안정형"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setRiskOb', {
                                            state: '안정형',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }else if(this.family_assets[i][0].risk == "성장형"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setRiskOb', {
                                            state: '성장형',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                                else if(this.family_assets[i][0].risk == "절대안정형"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setRiskOb', {
                                            state: '절대안정형',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                                else if(this.family_assets[i][0].risk == "절대성장형"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setRiskOb', {
                                            state: '절대성장형',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }else if(this.family_assets[i][0].risk == "안정성장형"){
                                    if(!isNaN(parseInt(this.family_assets[i][0].total))){
                                        this.$store.commit('customers/setRiskOb', {
                                            state: '안정성장형',
                                            money: parseInt(this.family_assets[i][0].total)
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                if(this.ffmonth_ex != []){
                    for(let k of this.ffmonth_ex){
                        if(!isNaN(parseInt(k))){
                            this.totalmonthex += k;
                        }
                    }
                }

                if(this.ffmonth_real != []){
                    for(let l of this.ffmonth_real){
                        if(!isNaN(parseInt(l))){
                            this.totalmonthreal += l;
                        }
                    }
                }

                if(this.ffyear != []){
                    for(let m of this.ffyear){
                        if(!isNaN(parseInt(m))){
                            this.totalyear += m;
                        }
                    }
                }

                if(this.fftotal != []){
                    for(let n of this.fftotal){
                        if(!isNaN(parseInt(n))){
                            this.totaltotal += n;
                        }
                    }
                }

                if(this.ffpresent != []){
                    for(let o of this.ffpresent){
                        if(!isNaN(parseInt(o))){
                            this.totalpresent += o;
                        }
                    }
                }

                if(this.ffDollarCount != []){
                    for(let p of this.ffDollarCount){
                        if(!isNaN(parseInt(p))){
                            this.totalDollarCount += p;
                        }
                    }
                }

                if(this.ffWonCount != []){
                    for(let q of this.ffWonCount){
                        if(!isNaN(parseInt(q))){
                            this.totalWonCount += q;
                        }
                    }
                }
            }).catch((err) => {
                console.error(err);
            });
        },

        onSubmitAsset(){
            this.$store.dispatch('customers/newAsset',{
                id: this.$route.params.id,
                purpose: this.purpose,
                goal: this.goal,
                depart: this.depart,
                name: this.name,
                month_ex: this.month_ex,
                month_real: this.month_real,
                year: this.year,
                total: this.total,
                present: this.present,
                enddate: this.enddate,
                term: this.term,
                risk: this.risk,
                ex_bm: this.ex_bm,
                money: this.money,
                date: this.date,
                startdate: this.startdate,
                account: this.account,
                addition: this.addition,
                quarterId: this.quarterId,
            }).then(()=>{
                console.log('succeed');
            }).catch((err)=> {
                console.log(err);
            })
        },

        onFSubmitAsset(){
            this.$store.dispatch('customers/newFAsset',{
                id: this.$route.params.id,
                family_name: this.selected_family,
                purpose: this.fpurpose,
                goal: this.fgoal,
                depart: this.fdepart,
                name: this.fname,
                month_ex: this.fmonth_ex,
                month_real: this.fmonth_real,
                year: this.fyear,
                total: this.ftotal,
                present: this.fpresent,
                enddate: this.fenddate,
                term: this.fterm,
                risk: this.frisk,
                ex_bm: this.fex_bm,
                money: this.fmoney,
                date: this.fdate,
                startdate: this.fstartdate,
                account: this.faccount,
                addition: this.faddition,
                quarterId: this.quarterId,
            }).then(()=>{
                console.log('succeed');
            }).catch((err)=> {
                console.log(err);
            })
        },

        resetState(){
            this.$store.commit('customers/setTermOb', {state: '단기', money: 0});
            this.$store.commit('customers/setTermOb', {state: '중기', money: 0});
            this.$store.commit('customers/setTermOb', {state: '장기', money: 0});
            this.$store.commit('customers/setTermOb', {state: '중장기', money: 0});
            this.$store.commit('customers/setTermOb', {state: '유동성', money: 0});
            this.$store.commit('customers/setRiskOb', {state: '성장형', money: 0});
            this.$store.commit('customers/setRiskOb', {state: '안정형', money: 0});
            this.$store.commit('customers/setRiskOb', {state: '절대성장형', money: 0});
            this.$store.commit('customers/setRiskOb', {state: '절대안정형', money: 0});
            this.$store.commit('customers/setRiskOb', {state: '안정성장형', money: 0});
            this.$store.commit('customers/setPurposeObNull');
            this.$store.commit('customers/setDepartObNull');
        },

        drawChart(){
            if(this.assets.length != 0){
                if(this.hideGraph == true){
                    this.hideGraph = false;
                    var ctx1 = this.$refs.graph1;
                    var ctx2 = this.$refs.graph2;
                    var ctx3 = this.$refs.graph3;
                    var ctx4 = this.$refs.graph4;
                    var ctx5 = this.$refs.graph5;
                    ctx1.getContext("2d").clearRect(0, 0, ctx1.width, ctx1.height);
                    ctx2.getContext("2d").clearRect(0, 0, ctx2.width, ctx2.height);
                    ctx3.getContext("2d").clearRect(0, 0, ctx3.width, ctx3.height);
                    ctx4.getContext("2d").clearRect(0, 0, ctx4.width, ctx4.height);
                    ctx5.getContext("2d").clearRect(0, 0, ctx5.width, ctx5.height);
                    var graph1Chart = new Chart(ctx1, {
                        type: 'doughnut',
                        data: {
                            labels: Object.keys(this.purposeOb),
                            datasets: [{
                                label: '투자 목적에 따른 자금 분포',
                                data: Object.values(this.purposeOb),
                                backgroundColor: [
                                    'rgba(250, 150, 70, 0.2)',
                                    'rgba(75, 170, 200, 0.2)',
                                    'rgba(125, 100, 160, 0.2)',
                                    'rgba(150, 185, 90, 0.2)',
                                    'rgba(80, 130, 190, 0.2)',
                                    'rgba(192, 80, 77, 0.2)',
                                    'rgba(114, 154, 202, 0.2)',
                                    'rgba(182, 88, 8, 0.2)',
                                    'rgba(40, 105, 125, 0.2)',
                                    'rgba(77, 99, 98, 0.2)',
                                    'rgba(95, 117, 48, 0.2)',
                                    'rgba(119, 44, 42, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(250, 150, 70, 1)',
                                    'rgba(75, 170, 200, 1)',
                                    'rgba(125, 100, 160, 1)',
                                    'rgba(150, 185, 90, 1)',
                                    'rgba(80, 130, 190, 1)',
                                    'rgba(192, 80, 77, 1)',
                                    'rgba(114, 154, 202, 1)',
                                    'rgba(182, 88, 8, 1)',
                                    'rgba(40, 105, 125, 1)',
                                    'rgba(77, 99, 98, 1)',
                                    'rgba(95, 117, 48, 1)',
                                    'rgba(119, 44, 42, 1)',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false,
                        }
                    });
                    
                    var graph2Chart = new Chart(ctx2, {
                        type: 'doughnut',
                        data: {
                            labels: Object.keys(this.departOb),
                            datasets: [{
                                label: '자산 구분에 따른 자금 분포',
                                data: Object.values(this.departOb),
                                backgroundColor: [
                                    'rgba(114, 154, 202, 0.2)',
                                    'rgba(182, 88, 8, 0.2)',
                                    'rgba(40, 105, 125, 0.2)',
                                    'rgba(77, 99, 98, 0.2)',
                                    'rgba(95, 117, 48, 0.2)',
                                    'rgba(119, 44, 42, 0.2)',
                                    'rgba(250, 150, 70, 0.2)',
                                    'rgba(75, 170, 200, 0.2)',
                                    'rgba(125, 100, 160, 0.2)',
                                    'rgba(150, 185, 90, 0.2)',
                                    'rgba(80, 130, 190, 0.2)',
                                    'rgba(192, 80, 77, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(114, 154, 202, 1)',
                                    'rgba(182, 88, 8, 1)',
                                    'rgba(40, 105, 125, 1)',
                                    'rgba(77, 99, 98, 1)',
                                    'rgba(95, 117, 48, 1)',
                                    'rgba(119, 44, 42, 1)',
                                    'rgba(250, 150, 70, 1)',
                                    'rgba(75, 170, 200, 1)',
                                    'rgba(125, 100, 160, 1)',
                                    'rgba(150, 185, 90, 1)',
                                    'rgba(80, 130, 190, 1)',
                                    'rgba(192, 80, 77, 1)',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false,
                        }
                    });

                    var graph3Chart = new Chart(ctx3, {
                        type: 'horizontalBar',
                        data: {
                            labels: Object.keys(this.termOb),
                            datasets: [{
                                label: '기간에 따른 자금',
                                data: Object.values(this.termOb),
                                backgroundColor: [
                                    'rgba(40, 105, 125, 0.2)',
                                    'rgba(77, 99, 98, 0.2)',
                                    'rgba(95, 117, 48, 0.2)',
                                    'rgba(119, 44, 42, 0.2)',
                                    'rgba(250, 150, 70, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(40, 105, 125, 1)',
                                    'rgba(77, 99, 98, 1)',
                                    'rgba(95, 117, 48, 1)',
                                    'rgba(119, 44, 42, 1)',
                                    'rgba(250, 150, 70, 1)',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false,
                        }
                    });

                    var graph4Chart = new Chart(ctx4, {
                        type: 'horizontalBar',
                        data: {
                            labels: Object.keys(this.riskOb),
                            datasets: [{
                                label: '위험도에 따른 자금',
                                data: Object.values(this.riskOb),
                                backgroundColor: [
                                    'rgba(40, 105, 125, 0.2)',
                                    'rgba(77, 99, 98, 0.2)',
                                    'rgba(95, 117, 48, 0.2)',
                                    'rgba(119, 44, 42, 0.2)',
                                    'rgba(250, 150, 70, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(40, 105, 125, 1)',
                                    'rgba(77, 99, 98, 1)',
                                    'rgba(95, 117, 48, 1)',
                                    'rgba(119, 44, 42, 1)',
                                    'rgba(250, 150, 70, 1)',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false,
                        }
                    });

                    var graph5Chart = new Chart(ctx5, {
                        type: 'doughnut',
                        data: {
                            labels: ['$', '원'],
                            datasets: [{
                                label: '달러 자산 분포',
                                data: [this.totalDollarCount, this.totalWonCount],
                                backgroundColor: [
                                    'rgba(119, 44, 42, 0.2)',
                                    'rgba(250, 150, 70, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(119, 44, 42, 1)',
                                    'rgba(250, 150, 70, 1)',
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false,
                        }
                    });
                }
            }            
        },

        showAddAssetContainer(){
            if(this.showAddAsset == false){
                this.showAddAsset = true;
                this.iconName = 'mdi-minus';
            }else{
                this.showAddAsset = false;
                this.iconName = 'mdi-plus';
            }
        },

        showAddFAssetContainer(){
            if(this.showAddFAsset == false){
                this.showAddFAsset = true;
                this.iconFName = 'mdi-minus';
            }else{
                this.showAddFAsset = false;
                this.iconFName = 'mdi-plus';
            }
        },
    },
}
</script>

<style scoped>
.customer-table th {
    width: 150px;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #ddd;
    background-color: #eee;
    color: #000;
    font-weight: normal;
}

.customer-table .delete {
    width: 50px;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #ddd;
    background-color: #fff;
}


.customer-family-table th {
    width: 150px;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #ddd;
    background-color: #eee;
    color: #000;
    font-weight: normal;
}

.customer-family-table .delete {
    width: 50px;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
    border-color: #ddd;
    background-color: #fff;
}

.customer-table tbody td{
    border-style: solid;
    border-color: #ddd;
    font-size: 12px;
}

.customer-family-table tbody td{
    border-style: solid;
    border-color: #ddd;
    font-size: 12px;
}

.table-width{
    width: 100%;
}

.add-asset-input{
    width: 100%;
    border-style: solid;
    border-color:#eee;
    text-align: left;
    margin-top: 10px;
}

.add-famliy-asset-input{
    width: 100%;
    border-style: solid;
    border-color:#eee;
    text-align: left;
    margin-top: 10px;
}

input {
    width: 142.5px;
    text-align: center;
    font-size: 12px;
    display: inline;
}

.customer-table tfoot td{
    background-color: #ffd1d1;
    height: 30px;
    width: 150px;
    border-style: solid;
    border-color: #ddd;
    font-size: 12px;
}

.customer-family-table tfoot td{
    background-color: #d4e5ff;
    height: 30px;
    width: 150px;
    border-style: solid;
    border-color: #ddd;
    font-size: 12px;
}

.total{
    margin-top: 10px;
}

.total td{
    width: 150px;
    border-style: solid;
    border-color: #aaa;
    background-color: #eee;
    height: 30px;
}

.total .delete{
    width: 50px;
    border-style: solid;
    border-color: #aaa;
    background-color: #eee;
    height: 30px;
}

.add-button{
    display: inline-block;
    width: 36px;
    height: 36px;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    background-color: #ffd1d1;
    margin-left: 5px;
}

.add-family-button{
    display: inline-block;
    width: 36px;
    height: 36px;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    background-color: #d4e5ff;
    margin-left: 5px;
}

.none {
  display: none !important;
}
</style>