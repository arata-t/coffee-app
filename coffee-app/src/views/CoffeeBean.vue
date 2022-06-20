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

    <router-link to="/coffee_beans">Back</router-link>
    <router-link :to="{ name: 'edit-coffee-bean', params: coffee_bean.id }">edit</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Flash from '@/components/FlashComp.vue' // ①

export default {
    computed: {
        ...mapState(["coffee_beans"]),
        coffee_bean() {
            return this.coffee_beans.find(coffeeBeanId => coffeeBeanId.id === this.$route.params.id) || {};
        }
    },
    components: { Flash }
}
</script>