const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies: async () => {
            return await Movie.find();
        },
        async getMovie(parent, args, context) {
            return await Movie.findById(args.id);
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    title: args.title,
                    description: args.description,
                    video: args.video,
                    type: args.type,
                    publicationDate: args.publicationDate
                }
            )
            return newMovie.save();
        },
        updateMovie(parent, {id, title, description, video, type, publicationDate}) {
            return Movie.findByIdAndUpdate(id, { title: title, description: description, video: video, type: type, publicationDate: publicationDate });
        }
    }
}