<template>
  <div>
    <Flash />
    <h1>Coffee Beans</h1>
    <button type="button" @click="openModal" style="text-transform: none" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default">Add CoffeeBean</button>
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
      <v-col cols="8">
        <table>
          <tr>
            <th>Date</th>
            <th>BeansName</th>
          </tr>
          <tr v-for="coffee_bean in coffee_beans" :key="coffee_bean.id">
            <td>{{ coffee_bean.purchase_date }}</td>
            <td>{{ coffee_bean.beans_name }}</td>
            <td><router-link :to="{name: 'show-coffee-bean', params: {id:coffee_bean.id}}">[ show ]</router-link></td>
          </tr>
        </table>
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
        ...mapState(["coffee_beans"])
    },
    data() {
        return {
            coffee_bean: {},
            modal: false,
        };
    },
    methods: {
      async onSubmit() {
        const coffee_bean = await this.$store.dispatch('addCoffeeBean', this.coffee_bean) // 変更
        // 定したルーティング先のページに飛ぶ
        this.$router.push({ name: 'show-coffee-bean', params: { id: coffee_bean.id }}) // 追記
      },
      openModal(){
        this.modal = true
      },
      closeModal(){
        this.modal = false
      },
    },

}
</script> 

<style lang="stylus">
/* モーダル */
.window {
  background:#f5f5f5;
  position: absolute;
  width: 50%;
  min-width: 360px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  padding: 20px 10px;
  border-radius: 10px;
  border: solid #707070;
  overflow: hidden;
  z-index: 2;
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
</style>