// set your Websocket Server details in WEBSOCKET_URI, it is set to default in SB now
// set your action ID of "Roulette Answer" in ACTION_ID
const WEBSOCKET_URI = 'ws://127.0.0.1:8080/';
const ACTION_ID = '4f3ad2f9-99b6-4639-bd5e-22a2acb79fc1';
const storedPrizes = JSON.parse(localStorage.getItem('wheelResults'));

window.APP = new Vue({
  el: '#app',
  data: {
    prizes: storedPrizes,
    radius: 0,
    max: 0,
    state: {
      spin: false
    }
  },
  mounted:function() {
    this.max = storedPrizes.length
    this.radius = 360 / storedPrizes.length
    this.spin()
  },
  methods: {
    spin () {
      if (this.state.spin) {
        return
      }
      let randomAnswer = undefined;
      let index = Math.floor(Math.random() * this.max)
      let rotations = 360 * ((Math.ceil(Math.random() * 10)) + 20) + ((index - 1) / this.max * 360) + (Math.floor(Math.random() * (360/this.max)))
      let seconds = 3;
      // console.log(this.prizes[index])
      // randomAnswer = "Test";
      randomAnswer = this.prizes[index];
      const ws = new WebSocket(WEBSOCKET_URI);
      ws.addEventListener('open', () => {
          ws.send(JSON.stringify({
            request: 'DoAction',
            id: 'DoAction',
            action: {
              id: ACTION_ID,
            },
            args: {
              rouletteAnswer: randomAnswer
            }
        }));
      });
      this.state.spin = true;
      
      new TweenMax.fromTo('#board', seconds, {
        rotation: 0
      },{
        rotation: -(rotations),
        ease: Sine.easeOut,
        onComplete: this.done
      })
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const removeFunc = async () => {
        const removePrize = storedPrizes.indexOf(randomAnswer);
        await sleep(1000);
        if (removePrize > -1) {
          storedPrizes.splice(removePrize, 1);
        }
        localStorage.setItem('wheelResults', JSON.stringify(storedPrizes));
      }
      removeFunc();      
    },    
    done () {
      this.state.spin = false;
    }
  }
})
