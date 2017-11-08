import {h, Component} from 'composi'
import {title} from './components/title'
import {Clock} from './components/clock'


title.state = 'Composi SVG Clock'

// Instantiate new clock component:
const clock = new Clock({
  container: 'section'
})
clock.update()