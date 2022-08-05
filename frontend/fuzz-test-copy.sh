#!/bin/bash
artillery run --output fuzz/report-test-copy.json fuzz/test-copy.yaml
artillery report --output fuzz/report-test-copy.html fuzz/report-test-copy.json