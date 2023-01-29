#!/bin/python3.8
import os
import time
os.chdir("messages")
while 1:
    time.sleep(5)
    ls = os.listdir()
    if len(ls) > 0:
        for mfile in ls:
            with open(f"{mfile}", "r") as f:
                message = f.read()
                print(message)

    

