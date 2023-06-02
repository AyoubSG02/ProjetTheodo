import express from 'express';
import axios from 'axios';
import Movie from '../entities/movies.js';
import { appDataSource } from '../datasource.js';

//const express = require('express');
const router = express.Router();
const movieRepository = appDataSource.getRepository(Movie);
const APIoptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjNlNzg0ODkzMDUxMjRjYmQ3YjNiMmViZjMyZjNjNCIsInN1YiI6IjY0NzBhYjRhNzcwNzAwMDExOTI0OGZlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-XX-u9jsBzlN_VSkOYDNyk11_AGkIqX1b3H1XK0_1YE',
  },
};

router.get('/', async (req, res) => {
  const movies = await movieRepository.find();
  res.json(movies);
});

// Écouteur sur le chemin /
router.get('/', (req, res) => {
  console.log("L'utilisateur a accédé à l'URL /");
  res.send("Bienvenue sur la page d'accueil");
});

// Populate movies into the database
router.get('/populate', async (req, res) => {
  try {
    const movielist = [];

    for (let i = 1; i <= 50; i++) {
      movielist.push(
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`,
          APIoptions
        )
      );
    }

    const responses = await Promise.all(movielist);
    const moviesData = responses.flatMap((response) => response.data.results);
    const filteredMoviesData = moviesData.filter(
      (movieData) => movieData.backdrop_path // Filter out movies with missing backdrop_path
    );

    for (const movieData of filteredMoviesData) {
      await movieRepository.save(movieData);
    }

    res.send('Movies populated successfully!');
  } catch (error) {
    res.status(500).send('Failed to populate movies.');
    console.log(error);
  }
});

router.post('/liked/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updateResult = await movieRepository.update(id, { liked: true });
    if (updateResult.affected === 0) {
      return res.status(404).send('Movie not found.');
    }

    res.send('Movie like status updated successfully!');
  } catch (error) {
    console.error('Error updating movie like status:', error);
    res.status(500).send('Failed to update movie like status.');
  }
});

router.post('/unliked/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updateResult = await movieRepository.update(id, { liked: false });
    if (updateResult.affected === 0) {
      return res.status(404).send('Movie not found.');
    }

    res.send('Movie like status updated successfully!');
  } catch (error) {
    console.error('Error updating movie like status:', error);
    res.status(500).send('Failed to update movie like status.');
  }
});

// Définir la route POST /new
router.post('/new', async (req, res) => {
  // Récupérer les données du corps de la requête
  const {
    title,
    adult,
    video,
    id,
    genre_ids,
    backdrop_path,
    release_date,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = req.body;

  // Vérifier si le film est liké
  const liked = req.body.liked ? 1 : 0;

  // Créer une instance de l'entité Movie
  const movie = movieRepository.create({
    title,
    adult,
    video,
    id,
    genre_ids,
    backdrop_path,
    release_date,
    liked,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  });

  // Sauvegarder le film dans la base de données
  await movieRepository.insert(movie);

  res.send('Film ajouté avec succès !');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await movieRepository.delete(id);
    res.send('Film supprimé avec succès !');
  } catch (error) {
    res
      .status(500)
      .send('Une erreur s est produite lors de la suppression du film');
  }
});

export default router;
