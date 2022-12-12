# import env config.
# You can change the default env config with `make env="config_special.env" build`
# env ?= .env
# include $(env)
# export $(shell sed 's/=.*//' $(env))

DIST_DIR := $(CURDIR)/dist
VERSION ?= releases/v1

# Set the default shell to use for shell commands
SHELL := /bin/bash

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

##@ Dist

.PHONY: publish-dist
publish-dist: ## Build and publish the distribution
	npm run package
	git add dist
	git commit -a -m "publish release: $(VERSION)"
	git push origin $(VERSION)
