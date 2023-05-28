import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../prisma/db";

export type Context = {
  prisma: PrismaClient;
};

const typeDefs = `#graphql

    type Novel {
        id: ID!
        title: String
        image: String
        createdAt: String
        updatedAt: String
        authors: [Author] 
    }

    type Author {
        id: ID!
        name: String
        novel: String
    }

    type Query {
        novel(id: ID) : Novel
        novels: [Novel]
    }

    type Mutation {
        addNovel: Novel
    }
`;

const resolvers = {
  Query: {
    novels: async (parent, args, context: Context) => {
      return await context.prisma.novel.findMany();
    },
  },
  Novel: {
    authors: async (parent, args, context: Context) => {
      return await context.prisma.author.findMany();
    },
  },
};

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});
