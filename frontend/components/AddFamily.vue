<template>
  <v-card>
        <v-container>
        <div>
            <p>이름</p>
            <v-text-field 
                label="이름"
                type="text"
                v-model="name"
                solo
                required
                clearable
            />
            <p>관계</p>
            <v-text-field 
                label="가족 관계"
                type="text"
                v-model="relation"
                solo
                clearable
            />
            <v-btn type="text"
                color="rgb(0, 212, 150)"
                class="submit-btn"
                @click.prevent="onAddFamily"
            >추가하기</v-btn>
        </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props:{
        id: {
            type: Number,
            required: true,
        }
    },

    data(){
        return{
            name: null,
            relation: null
        }
    },

    mounted(){
        console.log(this.id);
    },

    methods: {
        onAddFamily(){
            this.$store.dispatch('customers/newFamily', {
                name: this.name,
                relation: this.relation,
                id: this.id,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
        }
    },
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