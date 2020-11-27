<template>
  <page>
    <section class="rsvp">
      <p>
        Hey. Yeet is a small experiment in community funding.
      </p>

      <h3>How it works</h3>
      <p>
        It's 2020. This site is meant to be an easy way to ask for and
        receive some money if it could help. It is run by Philip M. in 
        Olympia, Washington.
      </p>
      
      <p>
        If you need any cash for any reason, and you know me, just
        ask here. This form will send a notification to my phone, 
        and I'll complete your request as soon as I can.
      </p>

      <p>
        The limit is $50 per person per month. The available funds will
        increase by $200 each month (around the 10th?). It's not totally
        anonymous, because I want to verify we know each other, and I need
        a way to send the funds, but otherwise it is all confidential.
      </p>

      <template v-if="summary.available < 20">
        <h4>Yeet is closed for the rest of the month</h4>
        <p>
          Thank you for visiting Yeet. The request form is closed 
          at this time because there is fewer than $20 available.
        </p>
        <p>&ndash; Phil</p>
      </template>
      <form v-else>
        <h4>Available funds</h4>
        ${{ summary.available }}

        <div>
          <label style="display: block">Amount to receive</label>
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
        method: 'Venmo',
        methodDetail: null,
        notes: '',

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
p {
  margin-bottom: 1.2em;
}
</style>