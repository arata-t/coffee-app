<template>
  <div>
    <Flash />
    <h1>Coffee Beans</h1>
    <button type="button" @click="openModal" style="text-transform: none" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default">Add CoffeeBean</button>
    <v-app >
      <v-container fluid>
        <v-data-iterator
          :items="coffee_beans"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          hide-default-footer
        >
          <!-- メインコンテンツ -->
          <template v-slot:default="props">
            <v-row>
              <v-col 
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="4"
                md="4"
                lg="3"
              >
                <router-link :to="{name: 'show-coffee-bean', params: {id:item.id}}">
                  <div id="cards">
                    <v-card color="grey lighten-5
">
                      <!-- 名前 -->
                      <v-card-title class="subheading-font-weight-bold">
                        {{item.beans_name}}
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense color="grey lighten-5">
                        <!-- 香り -->
                        <v-list-item>
                          <v-list-item-content>香り：</v-list-item-content>
                          <v-list-item-content>{{item.coffee_aroma}}</v-list-item-content>
                        </v-list-item>
                        <!-- 苦味 -->
                        <v-list-item>
                          <v-list-item-content>苦味：</v-list-item-content>
                          <v-list-item-content>{{item.bitter_taste}}</v-list-item-content>
                        </v-list-item>
                        <!-- 酸味 -->
                        <v-list-item>
                          <v-list-item-content>酸味：</v-list-item-content>
                          <v-list-item-content>{{item.coffee_acidity}}</v-list-item-content>
                        </v-list-item>
                        <!-- 値段 -->
                        <v-list-item>
                          <v-list-item-content>値段：</v-list-item-content>
                          <v-list-item-content>¥{{item.price_yen}}</v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </template>
          <!-- フッター -->
          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <!-- 前のページ -->
              <v-btn small fab color="normal" class="ml-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
              <v-spacer></v-spacer>
              <!-- 次のページ -->
              <v-btn small fab class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-app>
    <v-row>
      <v-col cols="4">
        <transition name="modal">
          <div v-show="modal">
            <!-- オーバーレイフィルター:クリックするとモーダルが閉じる -->
            <div class="fullOverlay" @click="closeModal">
            </div>
            <div class="window">
              <AddCoffeeBean />
            </div>  
          </div>
        </transition>
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
        ...mapState(["coffee_beans"]),
        numberOfPages () {
          return Math.ceil(this.coffee_beans.length / this.itemsPerPage)
        },
    },
    data() {
        return {
            coffee_bean: {},
            modal: false,
            itemsPerPage: 9, // 1ページ内に表示するカード数
            page: 1, 
        };
    },
    methods: {
      async onSubmit() {
        const coffee_bean = await this.$store.dispatch('addCoffeeBean', this.coffee_bean) // 変更
        // 定したルーティング先のページに飛ぶ
        this.$router.push({ name: 'show-coffee-bean', params: { id: coffee_bean.id }})
      },
      openModal(){
        this.modal = true
      },
      closeModal(){
        this.modal = false
      },
      formerPage(){
        if (this.page - 1 >= 1) {this.page -= 1}
      },
      nextPage(){
        if (this.page + 1 <= this.numberOfPages){this.page += 1}
      }
    },

}
</script> 

<style lang="stylus">

/* ダイアログ */
.window, .deleteDialog {
  position: absolute;
  width: 50%;
  min-width: 360px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  border-radius: 10px;
  border: solid #707070;
  overflow: hidden;
  z-index: 2;
}
/* モーダル */
.window {
  background:#f5f5f5;
  padding: 20px 10px;
  border: solid #707070;
}
/* オーバーレイ*/
.fullOverlay{
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
/* オーバーレイのトランザクション */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.v-textarea textarea {
  height: 96px;
}

// v-date-pickerのcssをリセット
  .v-application--wrap{
    min-height: auto;
  }
  .theme--light.v-application{
    background: none;
  }

// ルーターリンクのアンダーラインを消す
a {
    text-decoration: none;
}

</style>