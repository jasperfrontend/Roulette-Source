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
      'Alternative',
      'Annoying',
      'Band',
      'Best enjoyed after drinks',
      'Boyband / Girlband',
      'Catchy',
      'Chill',
      'Celebration',
      'Collab',
      'Covers',
      'Dead artist',
      'Driving in a car',
      'Enthusiastic',
      'Electronic',
      'Europe',
      'Fell off',
      'Female singer',
      'Forever a hit',
      'Foreign language',
      'Friday after work',
      'Funky',
      'Game music',
      'Great singer',
      'Great video',
      'Guilty pleasure',
      'Happy',
      'Hypnotic',
      'Hidden gem',
      'Hip-hop / rap',
      'House music',
      'I love you',
      'Instrumental',
      'Late at night',
      'Let Gnoosic decide',
      'Live performance',
      'Long hair',
      'Male singer',
      'Movie music',
      'Music to drink to',
      'Music to fuck to',
      'My mom hates this',
      'Non-English',
      'Number 1 hit song',
      'One hit wonder',
      'Rage / anger',
      'Rap group',
      'Reggae / dub',
      'Remix',
      'Scary',
      'Simple',
      'Sing & rap',
      'Smooth guitar',
      'Songs to sleep to',
      'Soul',
      'Sunny vacation vibes',
      'The 00s',
      'The 60s',
      'The 70s',
      'The 80s',
      'The 90s',
      'The feels',
      'This year',
      'Underground',
      'Unexpected',
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
      console.log(rotations)
      console.log(index)
      console.log(this.prizes[index])
      const randomAnswer2 = this.prizes[index]
        
      const ws = new WebSocket(WEBSOCKET_URI);
      ws.addEventListener('open', function (event) {
          ws.send(JSON.stringify({
            request: 'DoAction',
            id: 'DoAction',
            action: {
              id: ACTION_ID,
            },
            args: {
              rouletteAnswer: randomAnswer2
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