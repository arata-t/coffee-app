<template>
  <div>
    <Flash />
    <p>名前: {{ coffee_bean.beans_name }}</p>
    <p>購入日: {{ coffee_bean.purchase_date }}</p>
    <p>産地: {{ coffee_bean.beans_origin }}</p>
    <p>香り: {{ coffee_bean.coffee_aroma }}</p>
    <p>香り: {{ coffee_bean.bitter_taste }}</p>
    <p>苦味: {{ coffee_bean.bitter_taste }}</p>
    <p>酸味: {{ coffee_bean.coffee_acidity }}</p>
    <p>値段: {{ coffee_bean.price_yen }}</p>
    <p>コメント: {{ coffee_bean.beans_comment }}</p>

    <router-link to="/coffee_beans">[Back]</router-link>
    <span> ｜ </span>
    <button type="button" @click="openModal" style="text-transform: none" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default">Edit Coffee Bean</button>
    <span> ｜ </span>
    <span class="button_link" @click="deleteCoffeeBean(coffee_bean)">[ delete ]</span>

    <transition name="modal">
      <div v-show="modal">
        <div class="fullOverlay" @click="closeModal"></div>
        <div class="window">
          <EditCoffeeBean @emit='modal = $event' />
        </div>
      </div>
    </transition>
  
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Flash from '@/components/FlashComp.vue'
import EditCoffeeBean from './EditCoffeeBean';

export default {
  data(){
    return {
      modal: false,
    }
  },
  methods:{
    deleteCoffeeBean(coffee_bean) {
      this.$store.dispatch('deleteCoffeeBean', coffee_bean)
      this.$store.commit('setMessage', {
        status: true,
        message: 'CoffeeBeansContent was successfully destroyed.'
      })
      setTimeout(() => {
        this.$store.commit('setMessage', {})
      }, 2000)
      this.$router.push({ name: 'coffee_beans'})
    },
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    }
  },
  computed: {
      ...mapState(["coffee_beans"]),
      coffee_bean() {
          return this.coffee_beans.find(coffeeBeanId => coffeeBeanId.id === this.$route.params.id) || {};
      }
  },
  components: {
    EditCoffeeBean,
    Flash,
  },
}
</script>