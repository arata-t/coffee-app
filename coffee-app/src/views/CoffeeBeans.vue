<template>
  <div>
    <Flash />
    <h1>Coffee Beans</h1>
    <v-row>
      <v-col cols="4">
        <AddCoffeeBean />
      </v-col>
      <v-col cols="8">
        <table>
          <tr>
            <th>Date</th>
            <th>BeansName</th>
          </tr>
          <tr v-for="coffee_bean in coffee_beans" :key="coffee_bean.id">
            <td>{{ coffee_bean.purchase_date }}</td>
            <td>{{ coffee_bean.beans_name }}</td>
            <td><router-link :to="{name: 'show-coffee-bean', params: {id:coffee_bean.id}}">[ show ]</router-link></td>
            <td><router-link :to="{ name: 'edit-coffee-bean', params: {id: coffee_bean.id}}">[ edit ]</router-link></td>
            <td><span class="button_link" @click="deleteCoffeeBean(coffee_bean)">[ delete ]</span></td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddCoffeeBean from './AddCoffeeBean'
import Flash from '@/components/FlashComp.vue';
undefined

export default {
    components: {
    AddCoffeeBean,
    Flash
},
    computed: {
        ...mapState(["coffee_beans"])
    },
    data() {
        return {
            coffee_bean: {},
        };
    },
    methods: {
      async onSubmit() {
        const coffee_bean = await this.$store.dispatch('addCoffeeBean', this.coffee_bean) // 変更
        // 定したルーティング先のページに飛ぶ
        this.$router.push({ name: 'show-coffee-bean', params: { id: coffee_bean.id }}) // 追記
      },
      deleteCoffeeBean(coffee_bean) {
        this.$store.dispatch('deleteCoffeeBean', coffee_bean)
        this.$store.commit('setMessage', {
          status: true,
          message: 'CoffeeBeansContent was successfully destroyed.'
        })
        setTimeout(() => {
        this.$store.commit('setMessage', {})
      }, 2000)
      }
    },
}
</script> 