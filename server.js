const express = require('express')
const GraphQL = require('express-graphql').graphqlHTTP
const { 
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLNonNull,
        GraphQLList
} = require('graphql')

const app = express()

const employees = [
    {id: 1, emp_name:"John Oliver"}
]

const countries = [
    {id: 1, country_name:'India'},
    {id: 2, country_name:'Australia'},
    {id: 3, country_name:'Canada'}
]

const EmployeeType = new GraphQLObjectType({
    name:"Employee",
    description:"Employee Schema",
    fields:()=>({
        id:{
            type: new GraphQLNonNull(GraphQLInt)
        },
        emp_name:{
            type: new GraphQLNonNull(GraphQLString)
        }
    })
})

// Creating a GraphQL Schema for employees
const CountryType = new GraphQLObjectType({
    name:"countries",
    description:"A GraphQL countries schema",
    fields: ()=>(
        {
            id:{ 
                type: new GraphQLNonNull(GraphQLInt)
            },
            country_name:{
                type: new GraphQLNonNull(GraphQLString)
            },
        }
    )
})

// Example GraphQL Query for Employees Data
const RootQuery = new GraphQLObjectType({
    name:"Query",
    description:"Root Query",
    fields:()=>({
        country:{
            type: CountryType,
            description:"Fetch me a single country",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> countries.find(item => item.id === args.id ) 
        },
        countries:{
            type: new GraphQLList(CountryType),
            description:"Fetch me all countries",
            resolve: ()=> countries
        },
        employee:{
            type: EmployeeType,
            description:"Fetch me a single employee",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> employees.find(item => item.id === args.id ) 
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            description:"Fetch me all employees",
            resolve: ()=> employees
        },
        
    })
})

// create a schema object using GraphQLSchema 
const schema = new GraphQLSchema({
    query:RootQuery
})


// start the server with GraphQL 
app.use('/',GraphQL({
    schema:schema,
    graphiql:true
}))

const PORT = 8080
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))