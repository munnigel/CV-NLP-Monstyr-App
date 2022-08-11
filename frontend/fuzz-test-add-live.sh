#!/bin/bash
artillery run --output fuzz/report-test-add-live.json fuzz/test-add-live.yaml
# artillery report --output fuzz/report-test-add-live.html fuzz/report-test-add-live.json