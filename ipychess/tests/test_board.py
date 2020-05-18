#!/usr/bin/env python
# coding: utf-8

# Copyright (c) uribalb.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..board import Board


def test_board_creation_blank():
    w = Board()
    assert w.value == 'Hello World'
