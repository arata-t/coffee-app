<template>
  <div>
    <h2>Editing CoffeeBean</h2>
    <form>
      <v-text-field
          v-model="coffee_bean.beans_name"
          label="名前"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.purchase_date"
          label="購入日"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.beans_origin"
          label="産地"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.coffee_aroma"
          label="香り(1~5)"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.bitter_taste"
          label="苦味(1~5)"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.coffee_acidity"
          label="酸味(1~5)"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.price_yen"
          label="値段"  
        ></v-text-field>
        <v-textarea
          v-model="coffee_bean.beans_comment"
          label="コメント"
        ></v-textarea>

      <v-btn class="mr-4" @click="updateCoffeeBean">Update</v-btn>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function(){
    return {
      modal: false
    };
  },
  computed: {
    ...mapState(['coffee_beans']),
    coffee_bean() {
      return this.coffee_beans.find(b => b.id == this.$route.params.id) || {}
    }
  },
  methods: {
    async updateCoffeeBean() {
      await this.$store.dispatch('editCoffeeBean', this.coffee_bean) 
      // 親のmodalにfalseを付与して、モーダルを閉じる
      this.$emit("emit", this.modal)
    }
  }
}
</script>