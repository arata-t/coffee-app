<template>
  <div>
    <Flash />
    <v-app style=" margin-top: 0px;">
        <!-- 全体を１つのカードとして扱う -->
        <v-card class="v-top-var">
          <!-- ヘッダー：上寄せにする -->
          <v-app-bar
            dark
            prominent
            src="https://img.pretty-online.jp/wp-content/uploads/2021/04/24183349/life_coffeearea_eye.jpg"
            scroll-target="#scrolling-techniques-2"
          >
            <!-- 画像 -->
            <template v-slot:img="{ props }">
              <v-img
                v-bind="props"
                gradient="to top right, rgba(110,127,46,.27), rgba(122,71,25,.26)"
              ></v-img>
            </template>

            <!-- メニューバー：現状未実装 -->
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <!-- タイトル -->
            <v-app-bar-title  >
              <v-toolbar-title>Coffee Beans</v-toolbar-title>
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <!-- 豆追加アイコン -->
            <v-btn icon @click="openModal" >
              <v-icon>mdi-seed-plus</v-icon>
            </v-btn>

            <!-- オプションバー：現状未実装 -->
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

          </v-app-bar>

          <!-- カードエリア(メインコンテンツ) -->
          <v-sheet
            id="scrolling-techniques-2"
            class="overflow-y-auto"
          >
            <v-container fluid>
            <!-- 降順にする -->
              <v-data-iterator
                :items="coffee_beans.slice().reverse()"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                hide-default-footer
              >
                <!-- メインコンテンツ -->
                <template v-slot:default="props">
                  <v-row style="padding-top: 10px;">
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
                          <v-card color="grey lighten-5">
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
              </v-data-iterator>
            </v-container>
          </v-sheet>

          <!-- フッター -->
          <v-bottom-navigation
            background-color="brown lighten-1"
            dark
          >
            <!-- 前のページ -->
            <v-btn  small fab color="normal" class="ml-1" @click="formerPage">
              <span>Previous</span>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <!-- ページ番号 -->
            <div style="margin-top: 20px; font-size: 14px;">
              <span>Page{{ page }} / {{ numberOfPages }}</span>
            </div>

            <v-spacer></v-spacer>

            <!-- 次のページ -->
            <v-btn small fab class="ml-1" @click="nextPage">
              <span>Next</span>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </v-card>
    </v-app>

    <v-row>
      <v-col cols="4">
        <transition name="modal">
          <div v-show="modal">
            <!-- オーバーレイフィルター:クリックするとモーダルが閉じる -->
            <div class="fullOverlay" @click="closeModal">
            </div>
            <div class="window">
              <!-- emitされたイベントを受け取り、モーダルをクローズする -->
              <AddCoffeeBean v-on:closeModal="closeModal"></AddCoffeeBean>
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
            itemsPerPage: 6, // 1ページ内に表示するカード数
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
  height: 550px;
  overflow: auto;
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

// top-barの高さを指定
.v-top-var {
  z-index: 0;
}

// カードのタイトル欄の調整
.subheading-font-weight-bold{
  padding: 5px 12px;
}

// スマホ用レスポンシブ
@media screen and (max-height: 700px) {
  #scrolling-techniques-2{
    max-height:450px;
  }
}
</style>
