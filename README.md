# nestJs


# generate auto id 

~ yarn add uuid

# create module

~ nest g module tasks

# create service
~ nest g service tasks --no-spec


~ docker run --name postgres-nest -p 5432:5432  -e POSTGRES_PASSWORD=postgres -d postgres


# Data Persistence Postgresql and TypeOrm

* add typeORM

~ yarn add typeorm @nestjs/typeorm pg

# Active record vs data mapper patterns
https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md

- create repository : Type ORM doc Repository API
- getAll : createQueryBuilder

# Authentication and Authorization

~ nest g module auth

-credentials and password strengths :

https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc

- securely stores password :

Password hashing with bcrypt
~ yarn add bcrypt
https://www.npmjs.com/package/bcrypt

#JWT
- setting up the jwt module and passport.js
~ yarn add @nestjs/jwt @nestjs/passport passport passport-jwt

AuthModule - imports : [
PassportModule.register({defaultStrategy:'jwt'}),
JwtModule.register({
secret:'topSecret51',
signOptions:{
expiresIn:3600,
}
})

]

