#!/bin/python3.10
import csv
import json
import requests

file = csv.DictReader(open("violations.csv", "r"))
violations_list = list()
#for row in file:
    #print(row)
    #a = {"buisiness_id" : row["buisiness_id"]}
    #a = {"business_id": row["business_id"], "id_poursuite": row["id_poursuite"], "date": row["date"], "description": row["description"], "date_jugement": row["date_jugement"], "montant" : row["montant"]}
    #a = {"name": row["etablissement"], "owner": row["proprietaire"], "category": row["categorie"], "ville": row["ville"], "status" : row["statut"]}
    #print(a)
for row in file:
    violations_list.append({"business_id": row["business_id"], "id_poursuite": row["id_poursuite"], "date": row["date"], "description": row["description"], "date_jugement": row["date_jugement"], "montant" : row["montant"], "date_statut": row["date_statut"]})

with open("violations.json", "w") as f:
    json.dump(violations_list, f)



