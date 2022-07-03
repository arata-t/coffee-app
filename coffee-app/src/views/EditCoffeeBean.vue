<template>
  <div>
    <h2>Editing CoffeeBean</h2>

    <!-- 名前 -->
    <v-form  ref="checkForm">
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
      <v-btn class="mr-4" @click="onUpdate">Update</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function(){
    return {
      modal: false,
      // バリデーションの設定
      required(propertyType) { 
        // 文字列と数値両方に対してバリデーションを行う 
        return v => (v && v.length > 0 || (v>=1 && v<=5)) || `You must input a ${propertyType}`
      },
      items: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    ...mapState(['coffee_beans']),
    coffee_bean() {
      return this.coffee_beans.find(b => b.id == this.$route.params.id) || {}
    }
  },
  methods: {
    async onUpdate() {
      if (this.$refs.checkForm.validate()) {
        await this.$store.dispatch('editCoffeeBean', this.coffee_bean)
        // 親のmodalにfalseを付与して、モーダルを閉じる
        this.$emit("emit", this.modal)
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      this.text = `${year}${month}${day}`;
      this.menu = false;
      return;
    }
  }
}
</script>