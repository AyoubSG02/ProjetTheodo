import express from 'express';
import Movie from '../entities/movies.js';
import { appDataSource } from '../datasource.js';
//const express = require('express');
const router = express.Router();
const movieRepository = appDataSource.getRepository(Movie);
router.get('/', async (req, res) => {
  const movies = await movieRepository.find();
  res.json(movies);
});
// Écouteur sur le chemin /
router.get('/', (req, res) => {
  console.log("L'utilisateur a accédé à l'URL /");
  res.send("Bienvenue sur la page d'accueil");
});

// Définir la route POST /new
router.post('/new', async (req, res) => {
  // Récupérer les données du corps de la requête
  const { title, releaseDate } = req.body;

  // Créer une instance de l'entité Movie
  const movie = movieRepository.create({ title, releaseDate });

  // Sauvegarder le film dans la base de données
  await movieRepository.insert(movie);

  res.send('Film ajouté avec succès !');
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.delete(id);
    res.send('Film supprimé avec succès !');
  } catch (error) {
    res
      .status(500)
      .send('Une erreur s est produite lors de la suppression du film');
  }
});

export default router;
