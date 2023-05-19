const express = require('express')
const app = express()
const GraphQL = require('express-graphql').graphqlHTTP
const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql')

// Array of Countries Object
const countries = [
    { country_name:'India' },
    { country_name:'Australia' },
    { country_name:'Canada' },
    { country_name:'Germany' }
]

const CountryType = new GraphQLObjectType({
    name:"countries",
    description:"A Countries schema",
    fields: ()=>({
        country_name:{
            type: new GraphQLNonNull(GraphQLString)
        }
    })    
})
const Query = new GraphQLObjectType({
    name:"Query",
    description:"Query for data in graphql server",
    fields:()=>({
        countries:{
            type: new GraphQLList(CountryType),
            description:'this fetches me a list of all countries'
        },
    resolve: ()=> countries 

    })
})

const MySchema = GraphQLSchema({
    query: Query
}) 
app.get('/',GraphQL({
    schema:MySchema,
    graphiql: true
}))
const PORT = 8080
app.listen(PORT,()=> console.log('Server is running!'))