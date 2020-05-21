// Copyright (c) uribalb
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

import { Chessground } from 'chessground';
import { Config } from 'chessground/config';

import { camel_case, debounce, emit_resize } from "./utils"

// Import the CSS
import '../css/widget.css'
import '../css/chessground.css'
import '../css/pieces.css'

class ConfigClass implements Config { }
const config = new ConfigClass()

export
  class BoardModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
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
  board_container: any; board: any;
  initialize() {
    this.el.classList.add('brown', 'merida');
    this.el.style.width = this.model.get('width')
    this.el.style.height = this.model.get('width')

    this.board_container = document.createElement('div');

    this.el.appendChild(this.board_container)
    this.board_container.classList.add("jupyter-widgets");

    let scrollResizeHandler = debounce(emit_resize, 100)
    document.body.addEventListener('scroll', scrollResizeHandler, true);
    window.addEventListener('resize', scrollResizeHandler, true);
  }
  render() {
    super.render();
    this.model.on_some_change(Object.keys(this.get_options()), this.options_changed, this);
    requestAnimationFrame(this.render_chessground.bind(this))
  }
  render_chessground() {
    let config: Config = {
      ...this.get_options(),
      resizable: true,
    }
    this.board = Chessground(this.board_container, config)

  }
  options_changed() {
    this.board.set(this.get_options())
  }
  get_options() {
    let o = this.model.get('options');
    let options = Object();
    let key: string;
    for (let i = 0; i < o.length; i++) {
      key = o[i];
      // Convert from foo_bar to fooBar that Chessground.js uses
      options[camel_case(key)] = this.model.get(key);
    }
    return options;
  }
}
