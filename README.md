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
