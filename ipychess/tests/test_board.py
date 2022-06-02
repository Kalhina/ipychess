#!/usr/bin/env python
# coding: utf-8

# Copyright (c) uribalb.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..board import Board


def test_board_creation_default():
    b = Board()
    assert b.fen == 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
