<template>
  <v-card>
        <v-container>
        <div>
            <p>목적</p>
            <v-autocomplete 
                label="목적"
                v-model="purpose"
                :rules="[v =>  !!v || '목적은 필수입니다']"
                :items="purpose_list"
                required
                solo
                clearable
            />
            <p>목표금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="goal"
                solo
                clearable
            />
            <p>자산구분</p>
            <v-autocomplete 
                label="자산구분"
                v-model="depart"
                :rules="[v =>  !!v || '자산구분은 필수입니다']"
                :items="depart_list"
                required
                solo
                clearable
            />
            <p>상품명</p>
            <v-text-field 
                label="상품명"
                type="text"
                v-model="name"
                solo
                clearable
            />
            <p>월 투자예정금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="month_ex"
                solo
                clearable
            />
            <p>월 투자금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="month_real"
                solo
                clearable
            />
            <p>연 투자금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="year"
                solo
                clearable
            />
            <p>총 투자금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="total"
                solo
                clearable
            />
            <p>현재 평가금액</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="present"
                solo
                clearable
            />
            <p>기간</p>
            <v-text-field 
                label="8자리 숫자만 입력"
                type="text"
                v-model="enddate"
                solo
                clearable
            />
            <p>기간</p>
            <v-select
                label="기간"
                v-model="term"
                :items="term_list"
                solo
                clearable
            />
            <p>위험도</p>
            <v-select
                label="위험도"
                v-model="risk"
                :items="risk_list"
                solo
                clearable
            />
            <p>기대 BM</p>
            <v-text-field 
                label="숫자만 입력(%)"
                type="text"
                v-model="ex_bm"
                solo
                clearable
            />
            <p>총 수익률</p>
            <v-text-field 
                label="소수점과 숫자만 입력(%)"
                type="text"
                v-model="profit"
                solo
                clearable
            />
            <p>자산 비중</p>
            <v-text-field 
                label="숫자만 입력(%)"
                type="text"
                v-model="profit"
                solo
                clearable
            />
            <p>달러비중</p>
            <v-select
                label="달러비중"
                v-model="money"
                :items="money_list"
                solo
                clearable
            />
            <p>비고</p>
            <v-text-field 
                label="비고"
                type="text"
                v-model="addition"
                solo
                clearable
            />
            <p>자동이체일</p>
            <v-text-field 
                label="숫자만 입력"
                type="text"
                v-model="date"
                solo
                clearable
            />
            <p>가입시점</p>
            <v-text-field 
                label="8자리 숫자만 입력"
                type="text"
                v-model="startdate"
                solo
                clearable
            />
            <p>계좌번호</p>
            <v-text-field 
                label="계좌입력"
                type="text"
                v-model="account"
                solo
                clearable
            />
            <v-btn type="text"
                color="rgb(10, 80, 150)"
                class="submit-btn"
            >추가하기</v-btn>

        </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            purpose_list: ['은퇴자금', '절세', '자산증식', '유동성자금', '납세재원'],
            depart_list: ['해외금융', '은행', '사모조합', '공모펀드', '사모펀드', '부동산'], 
            term_list: ['단기', '중기', '장기', '유동성'],
            risk_list: ['성장형', '안정형', '안정성장형', '절대안정형'],
            money_list: ['$', '원'],
            purpose: null, goal: null, depart: null, name: null,
            month_ex: null, month_real: null, year: null, total: null,
            present: null, enddate: null, term: null, risk: null,
            ex_bm: null, profit: null, importance: null, money: null,
            date: null, startdate: null, account: null, addition: null,
        }
    }
}
</script>

<style scoped>
*{
    font-family: 'Noto Sans KR', sans-serif
}

.submit-btn{
    color: #fff;
    width: 100%;
}
</style>