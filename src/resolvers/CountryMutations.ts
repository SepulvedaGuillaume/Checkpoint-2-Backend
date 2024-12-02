import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Country } from '../entities/Country';
import { EntityManager } from 'typeorm';
import dataSource from '../datasource';

@InputType()
export class CountryInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  emoji!: string;

  @Field({ nullable: true })
  continentCode?: string;
}

@Resolver(Country)
export class CountryMutations {
  @Mutation((_) => Country)
  async createCountry(
    @Arg('countryData') countryData: CountryInput
  ): Promise<Country> {
    return dataSource.transaction(async (entityManager: EntityManager) => {
      try {
        if (!countryData.code || !countryData.name || !countryData.emoji) {
          throw new Error('Country code, name and emoji are required');
        }
        
        const country = new Country(
          countryData.code,
          countryData.name,
          countryData.emoji,
          countryData.continentCode || ''
        );
        await entityManager.save(country);
        return country;
      } catch (e) {
        console.error('cannot create country - ' + e);
        throw new Error('cannot create country - ' + e);
      }
    });
  }
}
