<template>
  <div>
    <p>名前: {{ coffee_bean.beans_name }}</p>
    <p>購入日: {{ coffee_bean.purchase_date }}</p>
    <p>産地: {{ coffee_bean.beans_origin }}</p>
    <p>香り: {{ coffee_bean.coffee_aroma }}</p>
    <p>香り: {{ coffee_bean.bitter_taste }}</p>
    <p>苦味: {{ coffee_bean.bitter_taste }}</p>
    <p>酸味: {{ coffee_bean.coffee_acidity }}</p>
    <p>値段: {{ coffee_bean.price_yen }}</p>
    <p>コメント: {{ coffee_bean.beans_comment }}</p>

    <router-link to="/coffee_beans">Back</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex' // ①

export default {
  computed: {
    ...mapState(['coffee_beans']), // ②
    coffee_bean() { // ③
      return this.coffee_beans.find(coffee_beanId => coffee_beanId.id === this.$route.params.id) || {}
    }
  }
}
</script>