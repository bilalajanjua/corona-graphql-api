const axios = require("axios").default;

const NOVEL_V2_API = "https://corona.lmao.ninja/v2";

const resolvers = {
  Query: {
    all: async () => await (await axios.get(`${NOVEL_V2_API}/all`)).data,
    yesterday: async (parent, { sort }, context, info) => {
      const countries = await (
        await axios.get(`${NOVEL_V2_API}/countries?yesterday=true`)
      ).data;
      return sort
        ? countries.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : countries;
    },
    countries: async (parent, { sort }, context, info) => {
      const current = await (await axios.get(`${NOVEL_V2_API}/countries`)).data;
      const yesterday = await (
        await axios.get(`${NOVEL_V2_API}/countries?yesterday=true`)
      ).data;
      const countries = await current.map((country) => {
        console.log("Current Country: ", country);
        const yesterdayResult = yesterday.find(
          (c) => c.country === country.country
        );
        if (!yesterdayResult) {
          return {
            ...country,
            analysis: null,
          };
        }
        const analysis = {};
        [
          "cases",
          "todayCases",
          "deaths",
          "todayDeaths",
          "recovered",
          "active",
          "critical",
        ].forEach((criteria) => {
          if (country[criteria]) {
            analysis[criteria] = {
              status:
                country[criteria] > yesterdayResult[criteria]
                  ? "Increasing"
                  : country[criteria] == yesterdayResult[criteria]
                  ? "Same as Yesterday"
                  : "Descreasing",
              percentage:
                country[criteria] >= yesterdayResult[criteria]
                  ? (country[criteria] / yesterdayResult[criteria]).toFixed(2)
                  : (yesterdayResult[criteria] / country[criteria]).toFixed(2),
            };
          }
        });
        return {
          ...country,
          analysis,
        };
      });
      return sort
        ? countries.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : countries;
    },
    country: async (parent, { name }, context, info) => {
      const country = await (
        await axios.get(`${NOVEL_V2_API}/countries/${name}`)
      ).data;

      const yesterday = await (
        await axios.get(`${NOVEL_V2_API}/countries?yesterday=true`)
      ).data;
      const yesterdayResult = yesterday.find(
        (c) => c.country === country.country
      );
      const analysis = {};
      [
        "cases",
        "todayCases",
        "deaths",
        "todayDeaths",
        "recovered",
        "active",
        "critical",
      ].forEach((criteria) => {
        analysis[criteria] = {
          status:
            country[criteria] > yesterdayResult[criteria]
              ? "Increasing"
              : country[criteria] == yesterdayResult[criteria]
              ? "Same as Yesterday"
              : "Descreasing",
          percentage:
            country[criteria] >= yesterdayResult[criteria]
              ? (country[criteria] / yesterdayResult[criteria]).toFixed(2)
              : (yesterdayResult[criteria] / country[criteria]).toFixed(2),
        };
      });
      return {
        ...country,
        analysis,
      };
    },
    states: async (parent, { sort }, context, info) => {
      const states = await (await axios.get(`${NOVEL_V2_API}/states`)).data;
      return sort
        ? states.sort((a, b) => parseFloat(b[sort]) - parseFloat(a[sort]))
        : states;
    },
    state: async (parent, { name: state }, context, info) => {
      return await (await axios.get(`${NOVEL_V2_API}/states/${state}`)).data;
    },
    historical: async () =>
      await (await axios.get(`${NOVEL_V2_API}/historical`)).data,
    historicalByCountry: async (parent, { name: country }, context, info) =>
      await (await axios.get(`${NOVEL_V2_API}/historical/${country}`)).data,
    historicalByCountryProvince: async (
      parent,
      { country, province },
      context,
      info
    ) =>
      await (
        await axios.get(`${NOVEL_V2_API}/historical/${country}/${province}`)
      ).data,
    jhucsse: async () =>
      await (await axios.get(`${NOVEL_V2_API}/jhucsse`)).data,
    worldwideHistoricalData: async () => {
      const data = await (await axios.get(`${NOVEL_V2_API}/historical/all`))
        .data;
      const dates = Object.keys(data.cases);

      const cases = [];
      const deaths = [];
      const recovered = [];

      dates.forEach((date) => {
        cases.push({
          date,
          count: data.cases[date],
        });
        deaths.push({
          date,
          count: data.deaths[date],
        });
        recovered.push({
          date,
          count: data.recovered[date],
        });
      });

      return { cases, deaths, recovered };
    },
  },
};

module.exports = resolvers;
