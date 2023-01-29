FROM ubuntu
WORKDIR /app
RUN apt update ; apt upgrade -y
RUN apt install python3.10 python3-pip vim -y
RUN pip install requests beautifulsoup4
RUN mkdir ./data
COPY ./downloader.py .
COPY ./format_address.py .
COPY ./format_raw_json.py .
COPY ./run.sh .
ENTRYPOINT ./run.sh
#"/app/downloader.py && /app/format_address.py && /app/format_raw_json.py && mv /app/*.json /app/data"

