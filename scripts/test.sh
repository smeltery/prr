#!/usr/bin/env bash
set -euo pipefail
go test -race -coverprofile=coverage.out . ./cmd/... ./internal/...
go tool cover -func=coverage.out | awk '/^total:/ {print "Total coverage: " $3; if (($3 + 0) < 79) exit 1}'
