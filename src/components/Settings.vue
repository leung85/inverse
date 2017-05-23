<template>
  <section id="settings">
    <h1>Settings</h1>
    <div>
      Time Limit:
      <input type="number"
             name="name"
             v-on:change="changeLimit"
             v-model="limit">
    </div>
    <div>
      <span>Select a font to play:</span>
      <ul>
        <li v-on:click="changeFont(font)"
            v-bind:class="{selected: selectedFont===font}"
            v-for="font in fonts">
          <span class="middle"
                v-bind:style="{fontFamily: font}">{{font}}</span>
        </li>
      </ul>
    </div>
    <div>
      <span>Game Mode:</span>
      <ul>
        <li class="ripple"
            v-on:click="changeMode(index)"
            v-bind:class="{selected: selectedMode===index}"
            v-for="(mode, index) in modes">
          <span class="middle">{{mode}}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: 'settings',
  data () {
    return {
      limit: localStorage.timelimit,
      fonts: ['monospace',
        // 'serif',
        // 'cursive',
        "'Indie Flower', cursive",
        // "'Gloria Hallelujah', cursive",
        "'Molle', cursive",
        // "'Dancing Script', cursive",
        // "'Shadows Into Light', cursive",
        // "'Pacifico', cursive",
        "'Yellowtail', cursive"
        // "'Handlee', cursive"
      ],
      modes: [
        'One Chance'
        // 'Scoring'
      ],
      selectedMode: parseInt(localStorage.mode),
      selectedFont: localStorage.font
    }
  },
  methods: {
    changeMode (modeIndex) {
      localStorage.mode = modeIndex
      this.selectedMode = modeIndex
    },
    changeFont (font) {
      localStorage.font = font
      this.selectedFont = font
    },
    changeLimit () {
      localStorage.timelimit = this.limit
    }
  }
}

</script>
<style scoped>
ul {
  /*text-align: left;*/
  padding: 0px 0px 16px 0px;
  list-style-type: none;
  max-height: 190px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 0px;
}

li {
  padding: 5px 0px;
  cursor: pointer;
  opacity: 0.3;
}

li.selected {
  font-weight: bold;
  font-size: 25px;
  opacity: 1;
}

input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid black;
  width: 130px;
  font-family: inherit;
}
</style>
