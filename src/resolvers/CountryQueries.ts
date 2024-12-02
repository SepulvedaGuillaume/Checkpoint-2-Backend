import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Country } from '../entities/Country';
import dataSource from '../datasource';

@Resolver(Country)
export class CountryQueries {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    console.log('getAllCountries from graphql');
    const countries: Country[] = await dataSource.manager.find(Country);
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg('code') code: string): Promise<Country> {
    console.log('getCountryByCode from graphql');
    if (!code) {
      throw new Error('Country code is required');
    }

    const country: Country | null = await dataSource.manager.findOne(Country, {
      where: { code }
    });

    if (!country) {
      throw new Error('No country found with code ' + code);
    }

    return country;
  }

  @Query(() => [Country])
  async getAllCountriesByContinentCode(
    @Arg('continentCode') continentCode: string
  ): Promise<Country[]> {
    console.log('getAllCountriesByContinentCode from graphql');
    if (!continentCode) {
      throw new Error('Continent code is required');
    }

    const countries: Country[] = await dataSource.manager.find(Country, {
      where: { continentCode }
    });

    return countries;
  }
}
