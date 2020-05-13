// Copyright (c) uribalb
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

import {Chessground} from 'chessground';

// Import the CSS
import '../css/widget.css'
import '../css/chessground.css'
// import '../css/board.css'
import '../css/pieces.css'

// import '../img/pieces/merida/wK.svg'

export
class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      value : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export
class ExampleView extends DOMWidgetView {
  board_container: any; obj:any;
  initialize() {
    // this.el.classList.remove('p-Widget');
    this.el.classList.add('brown', 'merida');
    this.el.style.width = "500px"
    this.el.style.height = "500px"
 
    this.board_container = document.createElement('div');

    this.el.appendChild(this.board_container)

    document.addEventListener('scroll', (e)=>{window.requestAnimationFrame(()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("scrolled!")})}, true);
    window.addEventListener('resize', (e)=>{window.requestAnimationFrame(()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("resized!")})}, true);

    // window.onresize = ()=>{document.body.dispatchEvent(new Event('chessground.resize')); console.log("resized!")}
  }
  render() {
    super.render();

    // this.value_changed();
    this.model.on('change:value', this.value_changed, this);

    this.render_chessground();
    // this.model.set('value', "rnbqkbnr/ppppp1pp/8/5p2/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2")


  }
  render_chessground() {
    // this.create_obj()
     setTimeout(()=>{this.create_obj()}, 0)
      // this.layer_views.update(this.model.get('layers'));
      // this.control_views.update(this.model.get('controls'));
      // this.leaflet_events();
      // this.model_events();
      // this.model.update_bounds().then(() => {
      //   this.touch();
      // });
     
  }
  create_obj() {
     let config:any = {
        fen: "",
        orientation: 'white'
        
        }
        
      this.obj = Chessground(this.board_container, config)
      
      
  }
  value_changed() {
    // this.board_container.textContent = this.model.get('value');
 
    let config:any = {
      fen: this.model.get('value'),
      }
    this.obj.set(config)
    // this.obj = Chessground(this.board_container, config)
   
  }
  update() {
     
  }
}
