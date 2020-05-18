// Copyright (c) uribalb
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

import {Chessground} from 'chessground';
// import { State, defaults } from 'chessground/state';

import { Config} from 'chessground/config';



// Import the CSS
import '../css/widget.css'
import '../css/chessground.css'
import '../css/pieces.css'

class ConfigClass implements Config {}
// const state = defaults() as Config;
const config = new ConfigClass() as Config
// configure(config, state)

export
class BoardModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      // config:configure(),,
      _model_name: BoardModel.model_name,
      _model_module: BoardModel.model_module,
      _model_module_version: BoardModel.model_module_version,
      _view_name: BoardModel.view_name,
      _view_module: BoardModel.view_module,
      _view_module_version: BoardModel.view_module_version,
      options: [],
      ...config
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'BoardModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'BoardView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export
class BoardView extends DOMWidgetView {
  board_container: any; board:any;
  initialize() {
    // this.el.classList.remove('p-Widget');
    this.el.classList.add('brown', 'merida');
    this.el.style.width = this.model.get('width')
    this.el.style.height = this.model.get('width')
 
    this.board_container = document.createElement('div');

    this.el.appendChild(this.board_container)
    this.board_container.classList.add("jupyter-widgets");

    document.addEventListener('scroll', (e)=>{window.requestAnimationFrame(()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("scrolled!")})}, true);
    window.addEventListener('resize', (e)=>{window.requestAnimationFrame(()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("resized!")})}, true);

    // window.onresize = ()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("resized!")}
  }
  render() {
    super.render();
    this.model.on('change:fen', this.fen_changed, this);
    setTimeout(this.render_chessground.bind(this), 0)
    console.log(this.model.get('fen'))


  }
  render_chessground() {
    let config:any = {
      fen: this.model.get('fen'),
      orientation: 'white'
      }
      
    this.board = Chessground(this.board_container, config)
     
  }
  fen_changed() {
    // this.board_container.textContent = this.model.get('fen');
    let config:any = {
      fen: this.model.get('fen'),
      }
    this.board.set(config)   
  }
  update() {
     
  }
}
