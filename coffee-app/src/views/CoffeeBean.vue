<template>
  <div>
    <Flash />
    <v-app>
      <v-card class="mx-auto" max-width="400" color="grey lighten-5">

        <!-- ヘッダー部分 -->
        <v-toolbar color="brown lighten-1" dense elevation="0" dark>
            <router-link to="/coffee_beans">
              <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </router-link>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
    
          <v-btn icon @click="menu = !menu">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- menuバー 常時非表示 -->
        <v-navigation-drawer 
        v-model="menu"
        absolute
        left
        width="200"
        temporary>
          <v-list nav dense>
            <v-list-item-group >
              <v-list-item @click="openModal">
                <v-list-item-title>編集</v-list-item-title>
              </v-list-item>
              <v-list-item  @click="openDeleteDialog">
                <v-list-item-title >削除</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <!-- メインコンテンツ -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              {{ coffee_bean.beans_name }}
            </v-list-item-title>
            <v-list-item-subtitle>最新更新：{{coffee_bean.updated_at}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col align=""
              class="text-h6"
              cols="5"
            >
              購入日：
            </v-col>
            <v-col cols="7" class="text-h6">
              {{ coffee_bean.purchase_date }}
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="text-h6"
              cols="5"
            >
              産地：
            </v-col>
            <v-col cols="7" class="text-h6">
              {{ coffee_bean.beans_origin }}
            </v-col>
          </v-row>
          <!-- 香り -->
          <v-row> 
            <v-col
              class="text-h6"
              cols="5"
            >
              香り：
            </v-col>
            <v-col cols="7" class="text-h6">
              <span v-for="n in coffee_bean.coffee_aroma" :key="n">
                <v-icon>fa-coffee</v-icon>
              </span>
            </v-col>
          </v-row>
          <!-- 苦味 -->
          <v-row>
            <v-col
              class="text-h6"
              cols="5"
            >
              苦味：
            </v-col>
            <v-col cols="7" class="text-h6">
              <span v-for="n in coffee_bean.bitter_taste" :key="n">
                <v-icon>fa-coffee</v-icon>
              </span>
            </v-col>
          </v-row>
          <!-- 酸味 -->
          <v-row>
            <v-col
              class="text-h6"
              cols="5"
            >
              酸味：
            </v-col>
            <v-col cols="7" class="text-h6">
              <span v-for="n in coffee_bean.coffee_acidity" :key="n">
                <v-icon>fa-coffee</v-icon>
              </span>
            </v-col>
          </v-row>
          <!-- 値段 -->
          <v-row>
            <v-col
              class="text-h6"
              cols="5"
            >
              値段：
            </v-col>
            <v-col cols="7" class="text-h6">
              ¥{{ coffee_bean.price_yen }}
            </v-col>
          </v-row>
          <!-- コメント -->
          <v-row>
            <v-col
              class="text-h6"
              cols="5"
            >
              コメント：
            </v-col>
            <v-col cols="12" class="text-h6">
              {{ coffee_bean.beans_comment }}
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-app>

    <!-- モーダル 常時非表示 -->
    <transition name="modal">
      <div v-show="modal">
        <div class="fullOverlay" @click="closeModal"></div>
        <div class="window">
          <!-- 子で'$emit'し  た値を'$event'で受け取る -->
          <EditCoffeeBean @emit='modal = $event' />
        </div>
      </div>
    </transition>
  
    <!-- 削除確認ダイアログ 常時非表示 -->
    <transition name="modal">
      <div v-show="deleteDialog">
        <div class="fullOverlay" @click="closeDeleteDialog"></div>
        <div class="deleteDialog">
          <v-card>
          <v-card-title>
            <p>本当に削除しますか？</p>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <button type="button" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" @click="deleteCoffeeBean(coffee_bean)">delete</button>
          </v-card-actions>
        </v-card>
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
      deleteDialog: false,
      menu: false,
    }
  },
  methods:{
    // 削除ダイアログを開く
    openDeleteDialog(){
      this.deleteDialog = true;
      this.menu = false;
    },

    // 削除ダイアログを閉じる
    closeDeleteDialog(){
      this.deleteDialog = false;
    },
    // 削除処理
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

    // 編集モーダルを開く
    openModal(){
      this.modal = true;
      this.menu = false;
    },

    // 編集モーダルを閉じる
    closeModal(){
      this.modal = false,
      // 枠外を選択した際はデータベースから値を取得し、データバインドを更新する
      this.$store.dispatch('fetchBeans')
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