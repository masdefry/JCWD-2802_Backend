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

                npm i express cors @types/express @types/cors @types/node

                npm i -D typescript concurrently nodemon

                npm i jsonwebtoken @types/jsonwebtoken

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



+ How to Setup ORM Prisma (JS or TS)?

        1. Install Package

                npm install prisma --save-dev

                npx prisma init --datasource-provider mysql

        2. Edit on `.env` Files

                DATABASE_URL="mysql://root:abc12345@localhost:3306/day08_prisma"

        3. Create Model Inside `prisma > schema.prisma`:
   
                model Users {
                    id    String     @id @default(cuid())
                    email String  @unique
                    name  String
                    password String
                  
                    usersaddress UsersAddress[]
                  
                    createdAt DateTime @default(now()) 
                    updatedAt DateTime @updatedAt 
                    deletedAt DateTime?
                }
          
                model UsersAddress{
                  id    Int     @id @default(autoincrement())
                  consignee String 
                  address String
                
                  users Users @relation(fields: [usersId], references: [id])
                  usersId String @unique  
                
                  createdAt DateTime @default(now()) 
                  updatedAt DateTime @updatedAt 
                  deletedAt DateTime?
                }

        4. Migration Models

                npx prisma migrate dev --name init

        5. Formatting `schema.prisma`

                npx prisma format or prisma format

        6. Setup Seeders

                - Create `seed.js` on `prisma` Folders

                - Add this code on `package.json`:
                
                        "prisma": {
                                "seed": "node prisma/seed.js"
                        }

                - After That, You Can Execute this Command:

                        npx prisma db seed

+ Authentication Types
                
                - Basic Auth

                - Bearer Auth

                - Oauth

                -