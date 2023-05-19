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
// Example: Employees Data
const data = [
    {id: 1, country_name:'India'}
]

// Creating a GraphQL Schema for employees
const CountryType = new GraphQLObjectType({
    name:"employees",
    description:"A GraphQL employees schema",
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
const CountryQuery = new GraphQLObjectType({
    name:"Query",
    description:"Country Query",
    fields:()=>({
        country:{
            type: CountryType,
            description:"Fetch me a single country",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> data.find(item => item.id === args.id ) 
        },
        countries:{
            type: new GraphQLList(CountryType),
            description:"Fetch me all countries",
            resolve: ()=> data
        }
    })
})

// create a schema object using GraphQLSchema 
const schema = new GraphQLSchema({
    query:CountryQuery
})


// start the server with GraphQL 
app.use('/',GraphQL({
    schema:schema,
    graphiql:true
}))

const PORT = 8080
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))