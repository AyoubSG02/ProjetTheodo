import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

router.post('/:userId/updateMovieLike', async function (req, res) {
  const { userId } = req.params;
  const { movieId, liked } = req.body;

  try {
    // 1. Récupérez l'utilisateur correspondant à l'identifiant userId depuis votre base de données
    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOne({ id: userId });

    // 2. Mettez à jour les informations de l'utilisateur avec le film liké
    if (liked) {
      // Si le film est liké, ajoutez le movieId aux films aimés de l'utilisateur
      user.likedMovies.push(movieId);
    } else {
      // Si le film n'est pas liké, supprimez le movieId des films aimés de l'utilisateur
      user.likedMovies = user.likedMovies.filter((movie) => movie.toString() !== movieId);
    }

    // 3. Sauvegardez les modifications dans la base de données
    await userRepository.save(user);

    res.json({ message: 'Informations de l\'utilisateur mises à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour des informations de l\'utilisateur' });
  }
});

export default router;
