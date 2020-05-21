#!/usr/bin/env python
# coding: utf-8

# Copyright (c) uribalb.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, Union, List, Dict, Bool, Int, TraitError, default, validate

from ._frontend import module_name, module_version
from .types import Color, Role, Key, File, Rank


class Board(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('BoardModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('BoardView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    width = Unicode('400px').tag(sync=True)

    # Chessground options
    fen = Unicode('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1').tag(sync=True, o=True)
    orientation = Color().tag(sync=True, o=True)
    turn_color = Color().tag(sync=True, o=True)
    check = Union([Color(), Bool()], default_value=False).tag(sync=True, o=True)
    last_move = Unicode().tag(sync=True, o=True)
    selected = Unicode().tag(sync=True, o=True)
    coordinates = Unicode().tag(sync=True, o=True)
    auto_castle = Unicode().tag(sync=True, o=True)
    view_only = Unicode().tag(sync=True, o=True)
    disable_context_menu = Unicode().tag(sync=True, o=True)
    resizable = Bool(default_value=True).tag(sync=True, o=True)
    add_piece_z_index = Unicode().tag(sync=True, o=True)
    highlight = Dict().tag(sync=True, o=True)
    animation = Dict().tag(sync=True, o=True)
    movable = Dict().tag(sync=True, o=True)
    premovable = Dict().tag(sync=True, o=True)
    predroppable = Dict().tag(sync=True, o=True)
    draggable = Dict().tag(sync=True, o=True)
    selectable = Dict().tag(sync=True, o=True)
    events = Dict().tag(sync=True, o=True)
    drawable = Dict().tag(sync=True, o=True)

    options = List(trait=Unicode()).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]
