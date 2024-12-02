import 'reflect-metadata';
import dataSource from './datasource/index';
import { Country } from './entities/Country';

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Data source has been initialized!');

    const countries = [
      {
        code: 'FR',
        name: 'France',
        emoji: '🇫🇷',
        continentCode: 'EU'
      },
      {
        code: 'BE',
        name: 'Belgique',
        emoji: '🇧🇪',
        continentCode: 'EU'
      },
      {
        code: 'US',
        name: 'États-Unis',
        emoji: '🇺🇸',
        continentCode: 'NA'
      },
      {
        code: 'JP',
        name: 'Japon',
        emoji: '🇯🇵',
        continentCode: 'AS'
      }
    ];

    for (const countryData of countries) {
      const country = dataSource.manager.create(Country, countryData);
      await country.save();
      console.log(`Inserted: ${country.name}`);
    }

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
    console.log('Data source has been destroyed!');
  }
}

seed();
