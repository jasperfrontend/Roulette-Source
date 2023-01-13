// set your Websocket Server details in WEBSOCKET_URI, it is set to default in SB now
// set your action ID of "Roulette Answer" in ACTION_ID
const WEBSOCKET_URI = 'ws://127.0.0.1:8080/';
const ACTION_ID = '4f3ad2f9-99b6-4639-bd5e-22a2acb79fc1';

window.APP = new Vue({
  el: '#app',
  data: {
    prizes: [
      'A bit gay',
      'A bit weird',
      'Acoustic',
      'Annoying',
      'Badass',
      'Band',
      'Best enjoyed after drinks',
      'Black artist',
      'Boyband / Girlband',
      'Catchy',
      'Chaotic',
      'Chill',
      'Collab',
      'Complex',
      'Cover',
      'Dance remix',
      'Dead artist',
      'Driving in a car',
      'Electronic',
      'European',
      'Favourite song right now',
      'Fell off',
      'Female singer',
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
      'House music',
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
      'My mom hates this',
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
      'Scary',
      'Simple',
      'Smooth guitar',
      'Song from your fav album',
      'So much bass',
      'Soulful',
      'Vacation vibes',
      'The 00s',
      'The 60s',
      'The 70s',
      'The 80s',
      'The 90s',
      'The feels',
      'Their best song',
      'Upbeat',
      'You decide',
      'Your country'
    ],
    radius: 0,
    max: 0,
    state: {
      spin: false
    }
  },
  mounted:function() {
    this.max = this.prizes.length
    this.radius = 360 / this.prizes.length
    this.spin()
  },
  
  methods: {
    spin () {
      if (this.state.spin) {
        return
      }
      
      let index = Math.floor(Math.random() * this.max)
      let rotations = 360 * ((Math.ceil(Math.random() * 10)) + 20) + ((index - 1) / this.max * 360) + (Math.floor(Math.random() * (360/this.max)))
      let seconds = 3.7
      // console.log(rotations)
      // console.log(index)
      // console.log(this.prizes[index])
      const randomAnswer = this.prizes[index]
      // const randomAnswer = "Not your language";
      const ws = new WebSocket(WEBSOCKET_URI);
      ws.addEventListener('open', function (event) {
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
      this.state.spin = true
      
      new TweenMax.fromTo('#board', seconds, {
        rotation: 0
      },{
        rotation: -(rotations),
        ease: Sine.easeOut,
        onComplete: this.done
      })
    },
    
    done () {
      this.state.spin = false
    }
  }
})