#!/bin/bash
artillery run --output fuzz/report.json fuzz/example.yaml
artillery report --output fuzz/report.html fuzz/report.json