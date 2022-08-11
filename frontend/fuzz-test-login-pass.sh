#!/bin/bash
artillery run --output fuzz/report-test-login-pass.json fuzz/test-login-pass.yaml
artillery report --output fuzz/report-test-login-pass.html fuzz/report-test-login-pass.json