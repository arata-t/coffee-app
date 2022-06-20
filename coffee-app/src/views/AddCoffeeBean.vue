<template>
      <v-form ref="checkForm">
        <v-text-field
          v-model="coffee_bean.beans_name"
          label="名前"
          :rules="[required('BeansName')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.purchase_date"
          label="購入日"
          :rules="[required('PurchaseDate')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.beans_origin"
          label="産地"
          :rules="[required('Origin')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.coffee_aroma"
          label="香り(1~5)"
          :rules="[required('Aroma')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.bitter_taste"
          label="苦味(1~5)"
          :rules="[required('BitterTaste')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.coffee_acidity"
          label="酸味(1~5)"
          :rules="[required('Acidity')]"
        ></v-text-field>
        <v-text-field
          v-model="coffee_bean.price_yen"
          label="値段"  
          :rules="[required('Price(¥)')]"
        ></v-text-field>
        <v-textarea
          v-model="coffee_bean.beans_comment"
          label="コメント"
          :rules="[required('comment')]"
        ></v-textarea>

        <v-btn class="mr-4" @click="onSubmit">Create</v-btn>
      </v-form>
</template>

<script>
export default {
  data() {
    return {
      coffee_bean: {},
      required(propertyType) {
        return v => v && v.length > 0 || `You must input a ${propertyType}`
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.$refs.checkForm.validate()){
        const coffee_bean = await this.$store.dispatch('addCoffeeBean', this.coffee_bean)
        this.$store.commit('setMessage', {
          status: true,
          message: 'CoffeeBeansContent was successfully created.'
        })
        setTimeout(() => {
          this.$store.commit('setMessage', {})
        },2000)
        this.$router.push({ name: 'show-coffee-bean', params: { id: coffee_bean.id}}) 
      }
    }
  }
}
</script>