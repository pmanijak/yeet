<template>
  <page>
      <section class="rsvp">
          <form>
              <div>
                  <label>Amount</label>
                  <input type="text" v-model="amount"/>
              </div>
              <div>
                  <label>Method</label>
                  <input type="text" v-model="method"/>
              </div>
              <div>
                  <label>Method detail</label>
                  <input type="text" v-model="methodDetail"/>
              </div>
              <div>
                  <label>Your name</label>
                  <input type="text" v-model="name"/>
              </div>

              <div>
                  <label>Want to share anything?</label>
                  <textarea v-model="notes" rows="6"></textarea>
              </div>
              
              <div style="text-align: center">
                  <div v-if="error">
                    <p>There was an error sending your message.</p> 
                    <p>Please txt me if this isn't working.</p>
                  </div>
                  <div v-if="isSending">Sending ...</div>
                  <div v-else-if="isSent">Sent. Thank you</div>
                  <div v-else>
                  <button 
                      type="submit" 
                      @click.prevent="sendLetter">Send</button>
                  </div>
              </div>
          </form>
      </section>
  </page>
</template>

<script>
import axios from 'axios';
import Page from '../components/Page.vue';

export default {
  components: { Page },
  data() {
    return {
        name: null,
        amount: null,
        method: null,
        methodDetail: null,
        notes: null,

        isSending: false,
        isSent: false,
        error: null
    };
  },
  methods: {
    sendLetter: function () {
      this.isSending = true;

      var data = {
        name: this.name,
        amount: this.amount,
        method: this.method,
        methodDetail: this.methodDetail,
        notes: this.notes,
      };

      axios.post('/api/letters', data)
        .then(() => {
          this.isSending = false;
          this.isSent = true;
        })
        .catch(err => {
          this.isSending = false;
          this.error = err;
        });
    }
  }   
}
</script>

<style scoped>
form div {
  margin-top: 1.2em;
}
</style>