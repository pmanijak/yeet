<template>
  <page>
    <section class="rsvp">
      <p>{{ summary.available }}</p>
      <form>
        <div>
          <label style="display: block">Amount</label>
          <button
              :class="{'selected': amount == '20'}"
              @click.prevent="setAmount('20')">$20</button>
          <button
              :class="{'selected': amount == '30'}"
              @click.prevent="setAmount('30')">$30</button>
          <button
              :class="{'selected': amount == '40'}"
              @click.prevent="setAmount('40')">$40</button>
          <button
              :class="{'selected': amount == '50'}"
              @click.prevent="setAmount('50')">$50</button>
        </div>

        <div>
          <label style="display: block">Method to receive funds</label>
          <button
              :class="{'selected': method == 'Paypal'}"
              @click.prevent="setMethod('Paypal')">Paypal</button>
          <button
              :class="{'selected': method == 'Venmo'}"
              @click.prevent="setMethod('Venmo')">Venmo</button>
        </div>

        <div>
            <label>{{ method }} username or whatever</label>
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
        method: "Venmo",
        methodDetail: null,
        notes: null,

        isSending: false,
        isSent: false,
        error: null
    };
  },
  async asyncData({ $axios }) {
    const summary = await $axios.$get('/api/summary')
    return { summary }
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
    },
    setAmount(val) {
      this.amount = val;
    },
    setMethod(val) {
      this.method = val;
    }
  }   
}
</script>

<style scoped>
button {
  max-width: 90px;
}
form div {
  margin-top: 1.2em;
}
</style>