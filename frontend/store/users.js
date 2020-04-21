export const state = () => ({
    user: null,
});

export const mutations = {
    setUser(state, payload){
        state.user = payload;
    },
};

export const actions = {
    signUp({commit}, payload){
        commit('setUser', payload);
    },

    logIn({commit}, payload){
        commit('setUser', payload);
    },

    logOut({commit}){
        commit('setUser', null);
    },
}