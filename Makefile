link:
	@echo $(shell cat module.json | jq ".name")
	@read -p "Enter Foundry Data path: " FOUNDRY_DATA_PATH; \
		ln -s $$PWD $$FOUNDRY_DATA_PATH/modules/$(shell cat module.json | jq ".name")