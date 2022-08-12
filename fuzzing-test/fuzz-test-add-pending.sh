#!/bin/bash
artillery run --output fuzz/report-test-add-pending.json fuzz/test-add-pending.yaml
# artillery report --output fuzz/report-test-add-pending.html fuzz/report-test-add-pending.json