import {h, Component} from 'composi'

export class Clock extends Component {
  render() {
    return (
      <svg id='clock' xmlns="http://www.w3.org/2000/svg"
        xmlns-xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        baseProfile="full"
        width="100%" 
        height="100%" 
        viewBox="0 0 200 200">
        <defs>
          <symbol id="threeHourStroke">
            <line x1="100" y1="0" x2="100" y2="18" stroke="#333" stroke-width="4.4" stroke-linecap="butt"/>
          </symbol>    
          <symbol id="hourStroke">
            <line x1="100" y1="0" x2="100" y2="14"  stroke="#333" stroke-width="4.4" stroke-linecap="butt"/>
          </symbol>
          <symbol id="minuteStroke">
            <line x1="100" y1="0" x2="100" y2="8" stroke="#333" stroke-width="3.6" stroke-linecap="butt"/>
          </symbol>

          <symbol id="quarterStrokes">
            <use xlink-href="#threeHourStroke" />
            <use xlink-href="#minuteStroke" transform="rotate( 6, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(12, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(18, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(24, 100, 100)"/>
            <use xlink-href="#hourStroke"   transform="rotate(30, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(36, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(42, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(48, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(54, 100, 100)"/>
            <use xlink-href="#hourStroke"   transform="rotate(60, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(66, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(72, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(78, 100, 100)"/>
            <use xlink-href="#minuteStroke" transform="rotate(84, 100, 100)"/>
          </symbol>
        </defs>
        <circle cx="100" cy="100" r="98.5" fill="#fff" stroke-width="3" stroke="#000"/>
        <g clip-path="url(#dialCircle)">
          <use xlink-href="#quarterStrokes"/>
          <use xlink-href="#quarterStrokes" transform="rotate( 90, 100, 100)"/>
          <use xlink-href="#quarterStrokes" transform="rotate(180, 100, 100)"/>
          <use xlink-href="#quarterStrokes" transform="rotate(270, 100, 100)"/>
        </g>
        <g id="hourHand" fill="#222">
          <rect x="97.3" y="65" width="5.4" height="35" fill="rgb(34,34,34)"/>
          <circle transform="matrix(1,0,0,1,3,0)" cx="97.3" cy="58.5" r="9" fill="rgb(34,34,34);"/>
          <circle transform="matrix(1,0,0,1,-3,0)" cx="102.7" cy="58.5" r="9" fill="rgb(34,34,34)"/>
          <path d="M90.757,58.5C90.757,54.167 92.2,47.167 100,37.5C107.8,47.167 109.329,54.167 109.329,58.5L90.757,58.5Z" fill="rgb(34,34,34)" fill-rule="nonzero"/>
          <path d="M93.5,123C97.833,124.667 102.167,124.667 106.5,123C104.167,118.333 102.9,110.667 102.7,100L97.3,100C97.3,110.667 96.033,118.333 93.5,123Z" fill="rgb(34,34,34" fill-rule="nonzero"/>
          <circle cx="100" cy="100" r="7.4" fill="rgb(34,34,34)"/>
        </g>
        <g id="minuteHand" fill="#222">
          <polygon points="95.3,49 99.5,2 100.5,2 104.7,49 102.7,100 97.3,100" stroke="none"/>
          <path d="M 93.5,123 Q 100,125.5 106.5,123 Q 103,116 102.7,100 L 97.3,100 Q 97.3,116 93.5,123 Z" stroke="none"/>
          <circle cx="100" cy="100" r="7" stroke="none"/>
        </g>
        <g id="secondHand">
          <polygon points="98,4 102,4 102.3,36 97.7,36" fill="#ad1a14" stroke="none"/>
          <circle cx="100" cy="45" r="10" fill="none" stroke="#ad1a14" stroke-width="4"/>
          <polygon points="97.5,56 102.5,55 103,102 97,102" fill="#ad1a14" stroke="none"/>
        </g>
      </svg>
    )
  }
  tick() {
    var now     = new Date();
    var hours   = now.getHours();
    var minutes = now.getMinutes();
    var time    = Math.min(60000, 1.025 * (1000 * now.getSeconds() + now.getMilliseconds()));
    var seconds = Math.floor(time / 1000);
    var millis  = time % 1000;
    rotate('hourHand',   hours * 30 + minutes * 0.5);
    rotate('minuteHand', minutes * 6);
    rotate('secondHand', 6 * seconds + 3 * (1 + Math.cos(Math.PI + Math.PI * (0.001 * millis))));

    function rotate(id, angle) {
      const element = document.getElementById(id);
      if (element) {
        element.setAttribute('transform', 'rotate(' + angle + ', 100, 100)');
        if (element.getAttribute('visibility') == 'hidden') {
          element.setAttribute('visibility', 'visible');
        }
      }
    }
  }
  componentWasCreated() {
    setInterval(() => this.tick())
  }
}

