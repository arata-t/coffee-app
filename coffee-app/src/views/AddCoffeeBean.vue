<template>
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

        <v-btn class="mr-4" @click="onSubmit">Create</v-btn>
      </form>
</template>

<script>
export default {
  data() {
    return {
      coffee_bean: {},
    }
  },
  methods: {
    async onSubmit() {
      const coffee_bean = await this.$store.dispatch('addCoffeeBean', this.coffee_bean)
      this.$router.push({ name: 'show-coffee-bean', params: { id: coffee_bean.id}})
    }
  }
}
</script>