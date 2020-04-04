const axios = require("axios").default;
const { NovelCovid } = require("novelcovid");

const covid = new NovelCovid();

const NOVEL_V1_API = "https://corona.lmao.ninja";
const NOVEL_V2_API = "https://corona.lmao.ninja/v2";

const resolvers = {
  Query: {
    all: async () => await covid.all(),
    yesterday: async (parent, { sort }, context, info) => {
      const countries = await (await axios.get(`${NOVEL_V1_API}/yesterday`))
        .data;
      if (!countries) return null;
      return sort
        ? countries.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : countries;
    },
    countries: async (parent, { sort }, context, info) => {
      const countries = await covid.countries();
      return sort
        ? countries.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : countries;
    },
    country: async (parent, { name: country }, context, info) =>
      await covid.countries(country),
    states: async (parent, { sort }, context, info) => {
      const states = await covid.states();
      return sort
        ? states.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : states;
    },
    state: async (parent, { name: state }, context, info) => {
      const states = await covid.states();
      return states.find(
        res => res.state.toLowerCase() === state.toLowerCase()
      );
    },
    historical: async () => await covid.historical(),
    historicalByCountry: async (parent, { name: country }, context, info) =>
      await covid.historical(null, country),
    historicalByCountryProvince: async (
      parent,
      { country, province },
      context,
      info
    ) =>
      await (
        await axios.get(`${NOVEL_V2_API}/historical/${country}/${province}`)
      ).data,
    jhucsse: async () => await covid.jhucsse(),
    worldwideHistoricalData: async () => {
      const data = await covid.historical(true);
      const dates = Object.keys(data.cases);

      const cases = [];
      const deaths = [];
      const recovered = [];

      dates.forEach(date => {
        cases.push({
          date,
          count: data.cases[date]
        });
        deaths.push({
          date,
          count: data.deaths[date]
        });
        recovered.push({
          date,
          count: data.recovered[date]
        });
      });

      return { cases, deaths, recovered };
    }
  }
};

module.exports = resolvers;
