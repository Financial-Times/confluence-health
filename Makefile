SHELL := /bin/bash

include n.Makefile

.PHONY: test

test: verify
	mocha --recursive --reporter spec test/server
