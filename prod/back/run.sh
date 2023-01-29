#!/bin/bash
/app/downloader.py && /app/format_address.py && /app/format_raw_json.py && mv /app/*.json /app/data
