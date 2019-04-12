##
# MLH Hackathon Nodejs Starter
# commands to run and manipulate docker environment
##
DKR=docker-compose
NODE=nodejs

default: help;

init:	## initialize your environment from the begining, build docker stuff, install dependencies and run the watch mode.
	${DKR} build
	make dependencies
	make watch

watch:	## run the application in development mode with a live reload, display the status of the containers and display the logs.
	${DKR} up -d
	make status
	echo ""
	make logs

run:	## run the production mode of the app, no livereload here, just launch nodejs and display the status of components.
	${DKR} run --rm ${NODE} npm run deploy
	make status

stop:	## stop the entire application, the database data is preserved.
	${DKR} down

restart:	## restart all components (nodejs and database).
	make stop
	make watch

dependencies:	## install (or reinstall) npm dependencies.
	${DKR} run --rm ${NODE} npm install

status:	## display status of each component, Up -> UNIX process is running. Exit -> UNIX process was killed or crash.
	${DKR} ps

logs:	## display nodejs server logs.
	${DKR} logs -f ${NODE}

command:	## launch a bash command inside your environment. example: make command cmd="npm install --save express"
	${DKR} run --rm ${NODE} ${cmd}

destroy:	## stop, clean and destroy everything. delete node_modules, destroy process and delete the entire database.
	read -p "This command will stop your env, clean the repo and destroy the database. Did you want to continue? (y/n)" resp ; \
	echo "" ; \
	if [ "$$resp" = "y" ]; then \
		${DKR} run --rm ${NODE} rm -rf ./node_modules ; ${DKR} down -v --remove-orphans ; \
	fi

help:	## display this help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ${MAKEFILE_LIST} | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY:
	init watch run stop restart dependencies status logs destroy
.SILENT:
	init watch run stop restart dependencies status logs destroy

# end
