#!/bin/bash
artillery run --output fuzz/report-test-login-fail.json fuzz/test-login-fail.yaml
artillery report --output fuzz/report-test-login-fail.html fuzz/report-test-login-fail.json