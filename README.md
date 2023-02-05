# CONFERENCE SPEAKER APP
### Description
	CRUD Website developed in JavaScript and Next.js
	RestAPI setup in Next.js to provide server side local database access
	Uses Next.js and Axios to read data from API.
	- Lists conference speakers
	- Allows to add new speakers
	- Allows to change favorite status
	- Allows to delete speakers

### PLURALSIGHT PROJECT ON:
    https://github.com/pkellner/pluralsight-designing-react-components-course-code

# RestAPI Addresses
	- /api/speakers/  (GET)
		to retreive data from file database
	- /api/speakers/[id] (POST, PUT and DELETE)
		to create, update and delete speakers

### COMPONENTS TREE
	- App
		- Header - # USES: useState
		- Speakers - # USES: useState
			- SpeakersToolbar
			- SpeakersList - # USES: custom hook
			- SpeakerAdd
			- Speaker
				- SpeakerImage
				- SpeakerDemographics
				- SpeakerFavorite

### HOW TO RUN
	Node version: 18

	node install
	node run dev (starts server on port 4000)

	Libraries in use:
	- npm install axios ## library to read API
	- npm install rsuite ## to display placeholder
	- npm install @coreui/react ## to display placeholder

### DEPLOY TO PRODUCTION SERVER WITH NGINX AND PM2
    Build Next.js page
    	npm run build

    Setting up PM2
    	- PM2 will run server in the background in port 3000 (set in package.json)
    	- In project directory run:
    		$ sudo npm install -g pm2
    	- run app in background with command
    		$ pm2 start "npm run start" --name "[YourAppName]"
    	- save processes list
    		$ pm2 save
    	- to run at automatically at startup
    		$ pm2 startup
    			- this outputs a command that has to be executed

    	- Manually bring up saved processes
    		$ pm2 resurrect

    MANAGING PM2
    	- list running
    		$ pm2 ls

    	- Restart process
    		$ pm2 restart <PID>
    		$ pm2 restart all

    	- Reload process after new build
    		$ pm2 rebuild 0

    	- stop processes
    		$ pm2 stop <PID>
    		$ pm2 stop all

    	- delete processes
    		$ pm2 delete <PID>
    		$ pm2 delete all


    Setting up nginx to host (reverseproxy) PM2 background app
    	- edit config file:
    		$ sudo nano /etc/nginx/nginx.conf
    	- enter following script:
    ###################################################################
    worker_processes  1;

    events {
      worker_connections  1024;
    }

    http {
    	server {
    			listen       80;
    			listen       [::]:80;
    			server_name  localhost;
    	location / {
    					# reverse proxy for next server
    					proxy_pass http://localhost:3000;
    					proxy_http_version 1.1;
    					proxy_set_header Upgrade $http_upgrade;
    					proxy_set_header Connection 'upgrade';
    					proxy_set_header Host $host;
    					proxy_cache_bypass $http_upgrade;
    			}
    	}
    }
    ###################################################################
    	- restart nginx:
    		$ sudo nginx -t
    		$ sudo systemctl restart nginx
