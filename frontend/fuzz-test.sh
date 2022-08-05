#!/bin/bash
artillery run --output fuzz/report-test.json fuzz/test.yaml
artillery report --output fuzz/report-test.html fuzz/report-test.json