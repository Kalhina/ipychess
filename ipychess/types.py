from traitlets import Enum, CaselessStrEnum
import string
from itertools import product


class Color(CaselessStrEnum):
    def __init__(self):
        self.default_value = 'white'
        self.values = ['white', 'black']


class Role(CaselessStrEnum):
    def __init__(self):
        self.values = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']


class Key(CaselessStrEnum):
    def __init__(self):
        self.values = list(map(lambda t: t[0] + str(t[1]), product(string.ascii_lowercase[:8], range(1,9))))


class File(CaselessStrEnum):
    def __init__(self):
        self.values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']


class Rank(Enum):
    def __init__(self):
        self.values = [1, 2, 3, 4, 5, 6, 7, 8]
