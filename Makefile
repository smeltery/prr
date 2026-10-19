BINARY := prr
VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo dev)
LDFLAGS := -s -w -X main.version=$(VERSION)

.PHONY: build install deps setup check test lint vet website ci clean cover browser-test release-check
.DEFAULT_GOAL := build

build:
	go build -ldflags "$(LDFLAGS)" -o $(BINARY) .
install:
	go install -ldflags "$(LDFLAGS)" .
deps:
	bun install --frozen-lockfile
	bun install --cwd website --frozen-lockfile
setup: deps
	bunx playwright install chromium
	pre-commit install --install-hooks
	pre-commit install --hook-type pre-push
check:
	@test -z "$$(gofmt -l cmd internal main.go)" || { gofmt -l cmd internal main.go; exit 1; }
	go vet . ./cmd/... ./internal/...
	golangci-lint run . ./cmd/... ./internal/...
	actionlint
	bun run check:docs
	bun run check:loc
	bun run --cwd website typecheck
	bun run --cwd website lint
lint: check
vet:
	go vet . ./cmd/... ./internal/...
test:
	bash scripts/test.sh
website:
	bun run --cwd website build
browser-test:
	bun run test:website
release-check:
	goreleaser build --snapshot --clean
ci: check test build website browser-test release-check
clean:
	rm -f $(BINARY) coverage.out
cover: test
	go tool cover -html=coverage.out
