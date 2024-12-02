import 'reflect-metadata';
import dataSource from './datasource/index';

async function clean() {
  await dataSource.initialize();
  console.log('Base de données SQLite initialisée avec succès.');

  // Liste des tables à nettoyer
  const tables = ['"country"'];

  for (const table of tables) {
    await dataSource.query(`DELETE FROM ${table}`);
    console.log(`Table ${table} nettoyée avec succès.`);
  }

  console.log('Nettoyage de la base de données terminé avec succès !');
  await dataSource.destroy();
}

clean().catch((error) => {
  console.error('Erreur lors du nettoyage de la base de données : ', error);
  process.exit(1);
});
