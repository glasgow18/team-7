


import pyrebase

class DatabaseManager:

    reference = None;

    def __init__(self):
        print("Initialize DatabaseManager.")

    @staticmethod
    def init():
        reference = DatabaseManager();