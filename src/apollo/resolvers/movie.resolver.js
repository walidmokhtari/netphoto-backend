const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies: async () => {
            return await Movie.find().populate('categories');
        },
        async getMovie(parent, args, context) {
            return await Movie.findById(args.id).populate('categories');
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    title: args.title,
                    description: args.description,
                    image: args.image,
                    video: args.video,
                    type: args.type,
                    publicationDate: args.publicationDate,
                    categories: args.categories
                }
            )
            return newMovie.save();
        },
        updateMovie(parent, {id, title, description, image, video, type, publicationDate, categories}) {
            return Movie.findByIdAndUpdate(id, { title: title, description: description,image: image, video: video, type: type, publicationDate: publicationDate,categories: categories });
        }
    }
}