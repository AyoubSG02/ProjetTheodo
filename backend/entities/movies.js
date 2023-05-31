import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: { 
      type: String 
    },
    genre: {
      type: String 
    },
  },
});

export default Movie;