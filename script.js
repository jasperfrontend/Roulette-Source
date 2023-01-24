// set your Websocket Server details in WEBSOCKET_URI, it is set to default in SB now
// set your action ID of "Roulette Answer" in ACTION_ID
const WEBSOCKET_URI = 'ws://127.0.0.1:8080/';
const ACTION_ID = '4f3ad2f9-99b6-4639-bd5e-22a2acb79fc1';
const prizes = [
  'A bit gay',
  'A bit weird',
  'Acoustic',
  'Ahead of its time',
  'Annoying',
  'Badass',
  'Band',
  'Best enjoyed after drinks',
  'Better live than recorded',
  'Black artist',
  'Boyband / Girlband',
  'Catchy',
  'Chill',
  'Collab',
  'Cover',
  'Cute',
  'Dance remix',
  'Dead artist',
  'Disgusting',
  'Driving in a car',
  'Electronic',
  'European',
  'Favourite song right now',
  'Fell off',
  'Female singer',
  'Folk / Traditional',
  'Friday after work',
  'Funky',
  'Game music',
  'Great singer',
  'Great video',
  'Guilty pleasure',
  'Happy',
  'Hard beat',
  'Hidden gem',
  'Hip-hop / rap',
  'Holidays',
  'House / Dance music',
  'I love you',
  'Instrumental',
  'Jasper decides',
  'Late at night',
  'Let Gnoosic decide',
  'Live performance',
  'Long hair',
  'Male singer',
  'Meme song',
  'Movie music',
  'Music to fuck to',
  'My parent(s) hate this',
  'My teenage angst time song',
  'Never gets old',
  'Non-English',
  'Not your language',
  'Number 1 hit song',
  'One hit wonder',
  'On drugs',
  'On repeat',
  'Piano',
  'Reggae / dub',
  'Remix',
  'Smooth guitar',
  'Song from your fav album',
  'Song I used to love and now hate',
  'Song that is a metaphor of your sex life',
  'So much bass',
  'Vacation vibes',
  'The 00s',
  'The 60s',
  'The 70s',
  'The 80s',
  'The 90s',
  'The feels',
  'Theme of your biographical movie',
  'Their best song',
  'Upbeat',
  'Workout music',
  'You decide',
  'Your country'
];
// REMOVE LINE 87's COMMENT BEFORE THE SHOW ONCE TO PUT STUFF IN LOCALSTORAGE
// localStorage.setItem('wheelResults', JSON.stringify(prizes));
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
      let seconds = 3
      console.log(this.prizes[index])
      // const randomAnswer = "Not your language";
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
