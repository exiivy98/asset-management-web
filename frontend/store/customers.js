export const state =() => ({
    purposeOb: {

    },

    departOb: {

    },

    termOb: {
        '단기': 0,
        '중기': 0,
        '장기': 0,
        '중장기': 0,
        '유동성': 0,
    },

    riskOb: {
        '성장형': 0,
        '안정형': 0,
        '절대성장형': 0,
        '절대안정형': 0,
        '안정성장형': 0,
    },



});

export const mutations = {
    setTermOb(state, payload){
        if(payload.state == "단기"){
            state.termOb.단기 += payload.money;
        }else if(payload.state == "중기"){
            state.termOb.중기 += payload.money;
        }else if(payload.state == "장기"){
            state.termOb.장기 += payload.money;
        }else if(payload.state == "중장기"){
            state.termOb.중장기 += payload.money;
        }else if(payload.state == "유동성"){
            state.termOb.유동성 += payload.money;
        }
    },

    setRiskOb(state, payload){
        if(payload.state == "성장형"){
            state.riskOb.성장형 += payload.money;
        }else if(payload.state == "안정형"){
            state.riskOb.안정형 += payload.money;
        }else if(payload.state == "절대안정형"){
            state.riskOb.절대안정형 += payload.money;
        }else if(payload.state == "절대성장형"){
            state.riskOb.절대성장형 += payload.money;
        }else if(payload.state == "안정성장형"){
            state.riskOb.안정성장형 += payload.money;
        }
    },

    setPurposeOb(state, payload){
        if(payload.exists == true){
            state.purposeOb[payload.state] += parseInt(payload.money);
        }else if(payload.exists == false){
            state.purposeOb[payload.state] = payload.money;
        }
    },

    setDepartOb(state, payload){
        if(payload.exists == true){
            state.departOb[payload.state] += parseInt(payload.money);
        }else if(payload.exists == false){
            state.departOb[payload.state] = payload.money;
        }
    },

    setPurposeObNull(state){
        state.purposeOb = {}
    },

    setDepartObNull(state){
        state.departOb = {}
    }

};

export const actions = {

    // 고객 추가
    newCustomer({commit}, payload){
        this.$axios.post('/customer', {
            name: payload.name,
            gender: payload.gender,
            birth: payload.birth,
            phone: payload.phone,
            userId: payload.userId,
        }).then((data) => {
            location.reload();
            console.log(data);
        }).catch((err) => {
            console.error(err);
        });
    },

    // 고객 삭제
    deleteCustomer({commit}, payload){
        this.$axios.post('/customer/delete', {
            payload
        }).then((res) => {
            console.log('succeed');
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 자산 추가
    newAsset({commit}, payload){
        this.$axios.post('/customer/customer/asset', {
            id: payload.id,
            purpose: payload.purpose,
            goal: payload.goal,
            depart: payload.depart,
            name: payload.name,
            month_ex: payload.month_ex,
            month_real: payload.month_real,
            year: payload.year,
            total: payload.total,
            present: payload.present,
            enddate: payload.enddate,
            term: payload.term,
            risk: payload.risk,
            ex_bm: payload.ex_bm,
            money: payload.money,
            date: payload.date,
            startdate: payload.startdate,
            account: payload.account,
            addition: payload.addition,
            quarterId: payload.quarterId,
        }).then((data) => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 가족 자산 추가
    newFAsset({commit}, payload){
        this.$axios.post('/customer/customer/family/asset', {
            id: payload.id,
            family_name: payload.family_name,
            purpose: payload.purpose,
            goal: payload.goal,
            depart: payload.depart,
            name: payload.name,
            month_ex: payload.month_ex,
            month_real: payload.month_real,
            year: payload.year,
            total: payload.total,
            present: payload.present,
            enddate: payload.enddate,
            term: payload.term,
            risk: payload.risk,
            ex_bm: payload.ex_bm,
            money: payload.money,
            date: payload.date,
            startdate: payload.startdate,
            account: payload.account,
            addition: payload.addition,
            quarterId: payload.quarterId,
        }).then((data) => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 가족 추가
    newFamily({commit}, payload){
        this.$axios.post('/customer/family', {
            name: payload.name,
            relation: payload.relation,
            id: payload.id,
        }).then((data) => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 분기 추가
    newQuarter({commit}, payload){
        this.$axios.post('/customer/new/quarter', {
            name: payload.name,
            customerId: payload.customerId,
        }).then(() => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 분기 삭제
    deleteQuarter({commit}, payload){
        this.$axios.post('/customer/delete/quarter', {
            payload: payload,
        }).then(() => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 자산 삭제
    deleteAsset({commit}, payload){
        this.$axios.post('/customer/delete/asset', {
            payload: payload,
        }).then(() => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },

    // 가족 삭제
    deleteFamily({commit}, payload){
        this.$axios.post('/customer/delete/family', {
            payload: payload,
        }).then(() => {
            location.reload();
        }).catch((err) => {
            console.error(err);
        });
    },
}