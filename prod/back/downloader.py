#!/bin/python3.10
import requests
from bs4 import BeautifulSoup

html = requests.get("https://open.canada.ca/data/en/dataset/05a9e718-6810-4e73-8bb9-5955efeb91a0").text

parser = BeautifulSoup(html, "html.parser")

#for i in parser.find_all("div"): print("\n\n\n\n\n\n\n\n\n", i, "\n\n\n\n\n\n\n\n\n")

for atags in parser.find_all("a", {"data-gc-analytics" : "manualDownload"}):
    link = atags["href"]
    if "violations" in link:
        download_link = link

with open("violations.csv", "wb") as f:
    f.write(requests.get(download_link).content)
