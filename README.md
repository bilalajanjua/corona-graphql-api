<h4 align="center">
    <a href="https://github.com/bilalajanjua/corona-graphql-api">
      <img src="https://github.com/bilalajanjua/corona-graphql-api/raw/master/.github/logo.jpg" alt="corona-graphql-api" />
    </a>
    <br>
    <br>

Get Latest Reports about coronavirus (COVID-19) using GraphQL API

</h4>

# corona-graphql-api

Get the updated statistics of Coronavirus or COVID-19 by using GraphQL API.

- Worldwide Coronavirus Reports
- Updated Daily
- Get Statistics about total and new cases, deaths, recovered, active and critical coronavirus counts.
- Get historical data of any country about Coronavirus.
- Use the power of GraphQL and make your own dashboard to analyze the reports.

**Note:** The GraphQL API is developed using [NovelCOVID API](https://github.com/NovelCOVID/API/)

## GraphQL Endpoint

You can use the hosted GraphQL API from here: [https://corona-graphql.herokuapp.com/](https://corona-graphql.herokuapp.com/).

## Usage

Following are the examples your queries you can use while making request to GraphQL API:

### Get Worldwide Statistics

```
query {
  all {
    cases
    deaths
    recovered
    updated
  }
}
```

### Get Reports of All Countries

```
# Get reports of all countries without sorting

query {
  countries {
    country
    countryInfo {
      lat
      long
      flag
      iso3
    }
    cases
    todayCases
    deaths
    todayDeaths
    recovered
    active
    critical
    casesPerOneMillion
    deathsPerOneMillion
  }
}
```

**Sorting:** You can use cases, todayCases, deaths, todayDeaths, recovered, active, critical, casesPerOneMillion and deathsPerOneMillion as sorting string.

```
query {
  countries(sort: "deaths") {
    country
    countryInfo {
      lat
      long
      flag
      iso3
    }
    cases
    todayCases
    deaths
    todayDeaths
    recovered
    active
    critical
    casesPerOneMillion
    deathsPerOneMillion
  }
}
```

**Get Historical Data of All Countries**

```
query {
  historical {
    country
    province
    timeline {
      cases
      deaths
    }
  }
}
```

### Get Sum of Cases and Deaths of Countries Historical Data

```
query {
  worldwideHistoricalData {
    cases {
      date
      count
    }
    deaths {
      date
      count
    }
  }
}

```

### Get Report of a Country

```
# Change the name with your desired country.

query {
  country(name: "Italy") {
    deaths
    cases
    todayCases
  }
}
```

**Get Historical Data of a Country**

```
query {
  historicalByCountry(name: "pakistan") {
    country
    province
    timeline {
      cases
      deaths
    }
  }
}
```

### Get Reports of U.S. States

```
query {
  states {
    state
    cases
    todayCases
    deaths
    todayDeaths
    active
  }
}
```

### Get Reports from Johns Hopkins CSSE Data Repository

```
query {
  jhucsse {
    country
    province
    updatedAt
    stats {
      confirmed
      deaths
      recovered
    }
    coordinates {
      longitude
      latitude
    }
  }
}
```

## Documentation

GraphQL Playground is enabled so you can access that from [here](https://corona-graphql.herokuapp.com/). The docs from playground will help you know more about the queries arguments and their return types.

## Sources

1. [NovelCOVID API](https://github.com/NovelCOVID/API/) based on the data of [Worldometer](https://www.worldometers.info/coronavirus/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
