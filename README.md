Hello, Student(s) JCWD-2802!

+ How to Install Typescript?

        1. Create New Directory 
    
        2. Install Following Package Inside New Directory

                npm i -g typescript ts-node

                tsc --init

        3. Setup `tsconfig.json` & Uncomment this Code: 
    
                "outDir": "./bundle",
    
        4. Running TS:
  
                ts-node <FILENAME>.ts





+ How to Setup Express Typescript?

        1. Create New Directory for Express Typescript Projects

        2. Inside New Directory, Execute this Command:

                npm init --yes

        3. Install Express Typescript

                npm i express

                npm i -D typescript @types/express @types/node

                npm i -D concurrently nodemon

                npm i cors @types/cors

                npm i mysql2

        4. Initiate Typescript Configuration

                npx tsc --init
  
        5. Edit `tsconfig.json`:
                
                - Uncomment rootDir:  "rootDir": "./src"
                
                - Uncomment outDir:   "outDir": "./dist"
        
        6. Replace Property `scripts` on `package.json` with this Code:
    
                "scripts": {
                        "build": "npx tsc",
                        "start": "node dist/index.js",
                        "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
                },

        7. Running Express Typescript Projects
  
                npm run dev