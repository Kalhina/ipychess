from traitlets import HasTraits, Enum, Bool, Dict, List
import string
from itertools import product

colors = ['white', 'black'] 
files = string.ascii_lowercase[:8]
ranks = string.digits[1:9]


class Color(Enum):
    def __init__(self):
        self.default_value = 'white'
        self.values = colors


class Role(Enum):
    def __init__(self):
        self.values = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']


class Key(Enum):
    def __init__(self):
        self.allow_none = True
        self.default_value = None
        self.values = ["a0"] + [f'{fl}{rk}' for fl, rk in product(files, ranks)]

