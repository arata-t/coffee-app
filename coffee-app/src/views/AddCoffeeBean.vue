<template>
  <div>
    <h2>Add CoffeeBean</h2>

    <!-- 名前 -->
    <v-form ref="checkForm">
      <v-text-field
        v-model="coffee_bean.beans_name"
        label="名前"
        :rules="[required('BeansName')]"
      ></v-text-field>

      <!-- 購入日 -->
      <!-- デフォルトだとid="app"なのでid=""え上書き -->
      <v-app id="">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="coffee_bean.purchase_date"
              label="購入日"
              v-bind="attrs" 
              v-on="on"   
              readonly
              :rules="[required('PurchaseDate')]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="coffee_bean.purchase_date"
            no-title
            scrollable
            @input="formatDate(picker)"
          >
          </v-date-picker>
        </v-menu>
      </v-app>

      <!-- 産地 -->
      <v-text-field
        v-model="coffee_bean.beans_origin"
        label="産地"
        :rules="[required('Origin')]"
      ></v-text-field>

      <!-- 香り -->
      <v-app id="">
        <v-row align="center">
          <v-col>
            <v-select
              v-model="coffee_bean.coffee_aroma"
              label="香り(1~5)"
              :rules="[required('Aroma')]"
              :items="items"
            ></v-select>
          </v-col>
        </v-row>
      </v-app>

      <!-- 苦味 -->
      <v-app id="">
        <v-row align="center">
          <v-col>
            <v-select
              v-model="coffee_bean.bitter_taste"
              label="苦味(1~5)"
              :rules="[required('BitterTaste')]"
              :items="items"
            ></v-select>
          </v-col>
        </v-row>
      </v-app>

      <!-- 酸味 -->
      <v-app id="">
        <v-row align="center">
          <v-col>
            <v-select
              v-model="coffee_bean.coffee_acidity"
              label="酸味(1~5)"
              :rules="[required('Acidity')]"
              :items="items"
            ></v-select>
          </v-col>
        </v-row>
      </v-app>

      <!-- 値段 -->
      <v-text-field
        v-model="coffee_bean.price_yen"
        label="値段"  
      ></v-text-field>

      <!-- コメント -->
      <v-textarea
        v-model="coffee_bean.beans_comment"
        label="コメント"
      ></v-textarea>


      <v-btn class="mr-4" @click="onSubmit">Create</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      coffee_bean: {},
      required(propertyType) {
        // 文字列と数値両方に対してバリデーションを行う
        return v => (v && v.length > 0 || (v>=1 && v<=5)) || `You must input a ${propertyType}`
      },
      items: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    async onSubmit() {
      const coffee_id = this.coffee_beans.map(function (p) {
        return p.coffee_id;
      });
      // 取得したcoffee_idから最大値を抽出
      const upper_coffee_id = Math.max(...coffee_id)
      this.coffee_bean.coffee_id = upper_coffee_id + 1;
      // バリデーション
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
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      this.text = `${year}${month}${day}`;
      this.menu = false;
      return;
    },
  },
  computed: {
    ...mapState(["coffee_beans"]),
    upper_coffee_id() {
      return null;
    }
  }
}
</script>