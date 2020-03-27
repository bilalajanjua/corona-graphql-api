const axios = require("axios").default;
const covid = require("novelcovid");

const NOVEL_V2_API = "https://corona.lmao.ninja/v2";

const resolvers = {
  Query: {
    all: async () => await covid.getAll(),
    countries: async (parent, { sort }, context, info) =>
      sort ? await covid.getCountry({ sort }) : await covid.getCountry(),
    country: async (parent, { name: country }, context, info) =>
      await covid.getCountry({ country }),
    states: async (parent, { sort }, context, info) =>
      sort ? await covid.getState({ sort }) : await covid.getState(),
    state: async (parent, { name: state }, context, info) =>
      await covid.getState({ state }),
    historical: async () =>
      await (await axios.get(`${NOVEL_V2_API}/historical`)).data,
    historicalByCountry: async (parent, { name }, context, info) =>
      await (await axios.get(`${NOVEL_V2_API}/historical/${name}`)).data,
    jhucsse: async () => await (await axios.get(`${NOVEL_V2_API}/jhucsse`)).data
  }
};

module.exports = resolvers;
