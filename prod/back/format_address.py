#!/bin/python3.10
import csv
import json
import requests

csvfile = csv.DictReader(open("violations.csv"))
#for row in csvfile:
#    print(row)
resto_list = list()
bids = list()

API_KEY = "AIzaSyC1GMfeCxwUTTm_yWoSFEpSBPrpnIu2ZYo"

def geo_loc(ADDRESS):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={ADDRESS}&key={API_KEY}"
    #print(ADDRESS)
    json_geo = requests.get(url).text
    json_geo = json.loads(json_geo)
    #print(json_geo)
    if json_geo["status"] == "OK":
        location = json_geo["results"][0]["geometry"]["location"]
        return location
    else:
        return "NONE"

#filelen = len([row for row in csvfile])
count = 0
for row in csvfile:
    address = row["adresse"].replace(" ", "+")
    address_raw = row["adresse"]
    bid = row["business_id"]
    if bid not in bids:
        bids.append(bid)
        lat_lon = geo_loc(address)
        if lat_lon != "NONE":
            resto_list.append({"business_id": bid, "name": row["etablissement"], "address" : address_raw, "owner": row["proprietaire"], "category": row["categorie"], "ville": row["ville"], "status" : row["statut"], "location" : [lat_lon]})
    count += 1
    print("\r" + str(count/6432) + "%", end="")



with open("location_array.json", "w") as f:
    json.dump(resto_list, f)

#"""
#
#
#    business_id: 23,
#
#    name: "Sophie Sucree",
#
#    address: "123 Main St.",
#
#    owner: "John Smith",
#
#    category: "Bakery",
#
#    ville: "Outremont",
#
#    status: "Open",
#
#    location: {
#
#      lat: 45.51530637108047,
#
#      lng: -73.57575248002632
#
#    }
#
#  }"""
#dict["results"][0]["geometry"]["location"]
#print(len(addresses))
# getting lat and long of address

#with open("temp.json", "w") as f:
#    json.dump(json_geo, f)



